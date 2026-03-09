import re
import json

with open(r'c:\Users\johnp\simmy-roes-app\src\data\courses.ts', 'r', encoding='utf-8') as f:
    old_content = f.read()

# Extract old info to preserve lecture_hours and lab_hours and flows
old_courses = {}
for match in re.finditer(r'\{[^{}]*id:\s*(\d+).*?\}', old_content, re.DOTALL):
    block = match.group(0)
    course_id = match.group(1)
    
    lecture_match = re.search(r'lecture_hours:\s*(\d+)', block)
    lab_match = re.search(r'lab_hours:\s*(\d+)', block)
    flow_match = re.search(r'flow:\s*"([^"]+)"', block)
    flow_code_match = re.search(r'flow_code:\s*"([^"]+)"', block)
    type_match = re.search(r"type:\s*'([^']+)'", block)
    comp_match = re.search(r'is_flow_compulsory:\s*(true|false)', block)
    
    old_courses[course_id] = {
        'lecture_hours': int(lecture_match.group(1)) if lecture_match else None,
        'lab_hours': int(lab_match.group(1)) if lab_match else None,
        'flow': flow_match.group(1) if flow_match else '-',
        'flow_code': flow_code_match.group(1) if flow_code_match else '-',
        'type': type_match.group(1) if type_match else 'elective',
        'is_flow_compulsory': comp_match.group(1) == 'true' if comp_match else False
    }

sem_map = {
    'Πρώτο': 1, 'Δεύτερο': 2, 'Τρίτο': 3, 'Τέταρτο': 4,
    'Πέμπτο': 5, 'Έκτο': 6, 'Έβδομο': 7, 'Όγδοο': 8, 'Ένατο': 9, 'Δέκατο': 10
}

flow_code_mapping = {
    'Y': 'Υπολογιστές',
    'T': 'Τηλεπικοινωνίες',
    'L': 'Λογισμικό',
    'S': 'Συστήματα',
    'E': 'Ενέργεια',
    'Z': 'Ενέργεια',
    'H': 'Ηλεκτρονική',
    'D': 'Δίκτυα',
    'O': 'Οικονομία',
    'I': 'Ιατρική',
    'M': 'Μαθηματικά',
    'F': 'Φυσική',
    'G': 'Μη εντασσόμενα σε ροές',
    'K': 'Κατασκευές'
}

with open(r'c:\Users\johnp\simmy-roes-app\μαθηματα.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_courses = []

for line in lines:
    if not line.startswith('|') or line.startswith('|-'):
        continue
    parts = line.split('|')
    if len(parts) > 13:
        title = parts[1].strip()
        code_str = parts[2].strip()
        description = parts[3].strip().replace('"', '\\"')
        professors = parts[4].strip().replace('"', '\\"')
        semester_str = parts[5].strip()
        ects_str = parts[7].strip()
        hours_str = parts[9].strip()
        direction_str = parts[10].strip()
        type_str = parts[11].strip()
        cat_str = parts[12].strip()
        group_str = parts[13].strip()
        
        if not code_str.isdigit():
            continue
            
        semester = sem_map.get(semester_str, 0)
        ects = int(ects_str) if ects_str.isdigit() else 0
        total_hours = int(hours_str) if hours_str.isdigit() else 0
        
        # Determine flow and flow code from 'Ομάδα' or old data
        primary_group = group_str.split(',')[0].strip()
        
        flow_code = '-'
        flow = '-'
        
        if primary_group and primary_group != '-':
            # Assume first English or Greek letter in group is the flow code
            match = re.search(r'[A-Za-zΑ-Ωα-ω]', primary_group)
            if match:
                # Map greek to english approximation for flow codes if necessary
                char = match.group(0).upper()
                gr_to_en = {'Υ':'Y', 'Τ':'T', 'Λ':'L', 'Σ':'S', 'Ε':'E', 'Ζ':'Z', 'Η':'H', 'Δ':'D', 'Ο':'O', 'Ι':'I', 'Μ':'M', 'Φ':'F', 'Γ':'G', 'Α':'G'}
                flow_code = gr_to_en.get(char, char)
                flow = flow_code_mapping.get(flow_code, '-')
        
        if group_str == '-' or group_str == '':
            if cat_str == "Ελεύθερα" or cat_str == "Επιλογή":
                 flow_code = 'G'
                 flow = "Μη εντασσόμενα σε ροές"
        
        if 'Αλλες' in group_str or 'Ελεύθερα' in group_str:
            flow_code = 'G'
            flow = 'Μη εντασσόμενα σε ροές'
            
        old_info = old_courses.get(code_str)
        course_type = 'elective'
        is_compulsory = False
        
        if old_info:
            if flow_code == '-' and old_info['flow_code'] != '-':
                flow_code = old_info['flow_code']
                flow = old_info['flow']
            lecture_hours = old_info['lecture_hours'] if old_info['lecture_hours'] is not None else total_hours
            lab_hours = old_info['lab_hours'] if old_info['lab_hours'] is not None else 0
            # Reuse type from old data because the txt's might be ambiguous
            course_type = old_info['type']
            is_compulsory = old_info['is_flow_compulsory']
        else:
            lecture_hours = total_hours
            lab_hours = 0
            is_compulsory = 'Υποχρ' in type_str or 'Υποχρ' in cat_str
            course_type = 'compulsory' if is_compulsory else 'elective'
        
        course_obj = {
            'id': int(code_str),
            'title': title,
            'semester': semester,
            'flow': flow,
            'flow_code': flow_code,
            'ects': ects,
            'type': course_type,
            'is_flow_compulsory': is_compulsory,
            'description': description,
            'professors': professors,
            'lecture_hours': lecture_hours,
            'lab_hours': lab_hours
        }
        new_courses.append(course_obj)

# Write out to courses.ts
with open(r'c:\Users\johnp\simmy-roes-app\src\data\courses.ts', 'w', encoding='utf-8') as f:
    f.write("import type { Course } from '../types/Course';\n\n")
    f.write("export const courses: Course[] = [\n")
    for i, c in enumerate(new_courses):
        f.write("    {\n")
        f.write(f"        id: {c['id']},\n")
        f.write(f"        title: \"{c['title']}\",\n")
        f.write(f"        semester: {c['semester']},\n")
        f.write(f"        flow: \"{c['flow']}\",\n")
        f.write(f"        flow_code: \"{c['flow_code']}\",\n")
        f.write(f"        ects: {c['ects']},\n")
        f.write(f"        type: '{c['type']}',\n")
        f.write(f"        is_flow_compulsory: {'true' if c['is_flow_compulsory'] else 'false'},\n")
        f.write(f"        description: \"{c['description']}\",\n")
        if c['professors'] and c['professors'] != '-':
            f.write(f"        professors: \"{c['professors']}\",\n")
        f.write(f"        lecture_hours: {c['lecture_hours']},\n")
        f.write(f"        lab_hours: {c['lab_hours']}\n")
        if i < len(new_courses) - 1:
            f.write("    },\n")
        else:
            f.write("    }\n")
    f.write("];\n")
    
print(f"Rebuilt courses.ts with {len(new_courses)} courses.")

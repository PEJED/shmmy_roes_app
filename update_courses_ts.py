import re

with open(r'c:\Users\johnp\simmy-roes-app\μαθηματα.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

course_data = {}
for line in lines:
    if not line.startswith('|') or line.startswith('|-'):
        continue
    parts = line.split('|')
    if len(parts) > 7:
        title = parts[1].strip()
        code_str = parts[2].strip()
        description = parts[3].strip()
        professors = parts[4].strip()
        ects_str = parts[7].strip()
        
        if code_str.isdigit():
            course_data[code_str] = {
                'title': title,
                'description': description,
                'professors': professors,
                'ects': ects_str
            }

with open(r'c:\Users\johnp\simmy-roes-app\src\data\courses.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def escape_quotes(text):
    # Escape double quotes but don't double escape if already escaped
    return text.replace('"', '\\"')

def replace_block(match):
    block = match.group(0)
    id_match = re.search(r'id:\s*(\d+)', block)
    if not id_match:
        return block
    
    course_id = id_match.group(1)
    if course_id in course_data:
        data = course_data[course_id]
        new_title = escape_quotes(data['title'])
        new_desc = escape_quotes(data['description'])
        new_prof = escape_quotes(data['professors'])
        new_ects = data['ects']
        
        # Replace title
        block = re.sub(r'title:\s*"[^"]*"', f'title: "{new_title}"', block)
        
        # Replace ects
        if new_ects.isdigit():
            block = re.sub(r'ects:\s*\d+', f'ects: {new_ects}', block)
        
        # Replace description
        if 'description:' in block:
            block = re.sub(r'description:\s*"[^"]*"', f'description: "{new_desc}"', block)
        else:
            block = re.sub(r'(lecture_hours:)', f'description: "{new_desc}",\n        \\1', block)
            
        # Replace professors
        if 'professors:' in block:
            if new_prof == '-' or new_prof == '':
                block = re.sub(r'\s*professors:\s*"[^"]*",?', '', block)
            else:
                block = re.sub(r'professors:\s*"[^"]*"', f'professors: "{new_prof}"', block)
        else:
            if new_prof != '-' and new_prof != '':
                block = re.sub(r'(lecture_hours:)', f'professors: "{new_prof}",\n        \\1', block)
                
    return block

# The regex matches from { to } for each course.
pattern = r'\{[^{}]*id:\s*\d+[^}]*\}'
new_content = re.sub(pattern, replace_block, content)

with open(r'c:\Users\johnp\simmy-roes-app\src\data\courses.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Successfully updated courses.ts with data for {len(course_data)} courses.")

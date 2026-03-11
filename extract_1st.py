import re

with open('pdf_all_text.txt', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's find "1ο ΕΞΑΜΗΝΟ" but skip the table of contents. In TOC there are numbers at the end.
# We want the occurrence that doesn't have a large number right after it or just find occurrences
occurrences = [m.start() for m in re.finditer(r'1ο ΕΞΑΜΗΝΟ', text)]

print(f"Found {len(occurrences)} occurrences of 1ο ΕΞΑΜΗΝΟ")
for i, idx in enumerate(occurrences):
    # print context of 500 chars after
    print(f"--- Occurrence {i+1} ---")
    print(text[idx:idx+500])

with open('sample_1st_sem.txt', 'w', encoding='utf-8') as out:
    for idx in occurrences:
        out.write(text[idx:idx+2000] + '\n\n' + '='*80 + '\n\n')


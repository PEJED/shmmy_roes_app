import re

with open('pdf_all_text.txt', 'r', encoding='utf-8') as f:
    text = f.read()

occurrences_4 = [m.start() for m in re.finditer(r'4ο ΕΞΑΜΗΝΟ', text)]
occurrences_5 = [m.start() for m in re.finditer(r'5ο ΕΞΑΜΗΝΟ', text)]

with open('sample_4_5.txt', 'w', encoding='utf-8') as out:
    for idx in occurrences_4:
        out.write(text[idx:idx+1500] + '\n\n' + '='*80 + '\n\n')
    for idx in occurrences_5:
        out.write(text[idx:idx+1500] + '\n\n' + '='*80 + '\n\n')


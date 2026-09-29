import json,re
from pathlib import Path
base=Path('public/20260923-001-HarveyWeinsteinSentenced15Years/subtitles')
def load(name,offset=0):
 out=[]
 for s in json.loads((base/name).read_text())['transcription']:
  raw=s['text'].replace(chr(34),''); txt=raw.strip()
  if not txt or txt.startswith('[_'):continue
  a=round(s['offsets']['from']/1000+offset,3); b=round(min(39.471,s['offsets']['to']/1000+offset),3)
  if out and ((not raw.startswith(' ') and not (out[-1]['text'].endswith('.') and txt[0].isupper())) or not re.search(r'\w',txt)):
   out[-1]['text']+=txt;out[-1]['end']=max(out[-1]['end'],b)
  else:out.append(dict(text=txt,start=a,end=b))
 return out
w=load('whisper-raw.json')
r=load('whisper-haley-offset-10.5.json',10.5)
w=[x for x in w if x['start']<11.28]+[x for x in r if x['text'].strip('.,') not in ['line','she']]+[x for x in w if x['start']>=14.81]
for x in w:
 if x['text']=='she':x['start']=14.98
 if x['text']=='project':x['text']='Project'
 if x['text']=='runway':x['text']='Runway'
# Collapse the erroneous closing phonetic fragments into the observed acoustic span.
# No subdivision or synthetic equal spacing. Phrase captions are used throughout.
w=[x for x in w if x['text']!='hey']
j=next(i for i,x in enumerate(w) if x['text']=="don't")
w[j:j+3]=[dict(text='justice',start=w[j]['start'],end=w[j+2]['end'])]
for x in w:
 if x['text']=='unfinished,':x['text']='unfinished?'
 if x['text']=='comment':x['text']='Comment'
 if x['text']=='prosecutors':x['text']='Prosecutors'
 if x['text']=='his':x['text']='His'
 if x['text']=='sex':x['text']='sex-'
# Join compound using its existing observed span.
j=next(i for i,x in enumerate(w) if x['text']=='sex-')
w[j:j+2]=[dict(text='sex-offender',start=w[j]['start'],end=w[j+1]['end'])]
for i,x in enumerate(w):
 assert 0<=x['start']<x['end']<=39.471,x
 if i:assert w[i-1]['end']<=x['start'],(w[i-1],x)
phrases=[
'Harvey Weinstein just got','15 years','and he still won\'t','say he\'s guilty.',
'Picture it, 74','wheeled into Manhattan court,','hands cuffed to the chair,',
'Prosecutors wanted 20,','His lawyers begged for nine.',
'Then Miriam Haley stood up.','Former Project Runway assistant,','she called it a','life sentence for her',
'after testifying twice','through an overturned conviction','and a 2025 retrial.',
'And this is wild,','he said he feels bad','for Haley,','then said he\'s innocent.',
'Judge Farber wasn\'t having it.','"You took what you wanted','by force," he said.',
'"And you have never','accepted responsibility."','Six years of appeals,','same charge,','15 years,',
'plus sex-offender registration,','so justice delayed','or unfinished?','Comment below.'
]
def norm(t):return re.sub(r'[^a-z0-9]','',t.lower())
cues=[];i=0
for phrase in phrases:
 expected=phrase.split(); span=w[i:i+len(expected)]
 assert [norm(x) for x in expected]==[norm(x['text']) for x in span],(phrase,span)
 cues.append(dict(text=phrase,start=span[0]['start'],end=span[-1]['end']))
 i+=len(expected)
assert i==len(w),(i,len(w))
(base/'narration.words.json').write_text(json.dumps(w,indent=2)+'\n')
(base/'narration.cues.json').write_text(json.dumps(cues,indent=2)+'\n')
def stamp(s):
 ms=round(s*1000);return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}'
(base/'narration.srt').write_text('\n\n'.join(f'{i+1}\n{stamp(c["start"])} --> {stamp(c["end"])}\n{c["text"]}' for i,c in enumerate(cues))+'\n')
print(len(w),'words;',len(cues),'cues; chronological finite timings validated')

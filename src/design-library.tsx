import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {Button} from './components/ui/button';
import {Input,TextArea} from './components/ui/input';
import {Switch} from './components/ui/switch';
import {Slider} from './components/ui/slider';
import {Toggle} from './components/ui/toggle';
import {ToggleGroup,ToggleGroupItem} from './components/ui/toggle-group';
import {ChoiceGroup,ChoiceItem} from './components/ui/choice-group';
import {Tabs,TabsList,TabsTrigger,TabsContent} from './components/ui/tabs';
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from './components/ui/select';
import {Card,CardHeader,CardTitle,CardDescription,CardContent,CardFooter} from './components/ui/card';
import {Accordion,AccordionItem,AccordionTrigger,AccordionContent} from './components/ui/accordion';
import {Label} from './components/ui/label';
import {Separator} from './components/ui/separator';
import {Skeleton} from './components/ui/skeleton';
import {Plus,Trash,Play,Pause,Scissors,SpeakerHigh as Volume2,ArrowCounterClockwise as Undo2,ArrowClockwise as Redo2,CaretDown as ChevronDown,SlidersHorizontal as Settings2,Cursor as MousePointer,TextT as Type,Camera,Image,Download} from '@phosphor-icons/react';
const Sample=({name,children}:{name:string,children:React.ReactNode})=><div data-figma-name={name} style={{display:'flex',flexDirection:'column',gap:12,padding:24,background:'var(--surface)',borderRadius:12,width:340}}><h3 style={{fontSize:12,color:'var(--muted)'}}>{name}</h3><div data-figma-name={'component/'+name}>{children}</div></div>;
const Section=({name,children}:{name:string,children:React.ReactNode})=><section data-figma-name={name} style={{display:'flex',flexDirection:'column',gap:24}}><h2 style={{fontSize:24,fontWeight:600}}>{name}</h2><div style={{display:'flex',flexWrap:'wrap',gap:24}}>{children}</div></section>;
function Library(){return <main style={{padding:64,width:1440,display:'flex',flexDirection:'column',gap:64}}><h1 style={{fontSize:32,fontWeight:600}}>Recordly — Source components</h1>
<Section name="Button">{(['default','secondary','outline','ghost','destructive','destructive-soft','link'] as const).map(variant=><Sample key={variant} name={'Button / '+variant}><div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{(['sm','default','lg'] as const).map(size=><Button key={size} variant={variant} size={size}>{size==='default'?'Action':size}</Button>)}<Button variant={variant} disabled>Disabled</Button><Button variant={variant} size="icon"><Plus/></Button></div></Sample>)}</Section>
<Section name="Input">{[false,true].map(disabled=><Sample name={'Input / '+(disabled?'Disabled':'Default')}><Input placeholder="Project name" disabled={disabled}/></Sample>)}<Sample name="Input / Filled"><Input defaultValue="My recording"/></Sample><Sample name="TextArea"><TextArea defaultValue="Add an annotation to your video"/></Sample></Section>
<Section name="Switch">{[false,true].map(checked=><Sample name={'Switch / '+checked}><Switch checked={checked}>Enable captions</Switch></Sample>)}<Sample name="Switch / Disabled"><Switch disabled checked>Enable captions</Switch></Sample></Section>
<Section name="Slider"><Sample name="Slider / Single"><Slider aria-label="Padding" value={[40]} min={0} max={100}/></Sample><Sample name="Slider / Range"><Slider aria-label="Range" value={[20,80]} min={0} max={100}/></Sample><Sample name="Slider / Disabled"><Slider aria-label="Disabled" value={[40]} disabled/></Sample></Section>
<Section name="Toggle"><Sample name="Toggle / Default"><Toggle pressed={false}>Bold</Toggle></Sample><Sample name="Toggle / Selected"><Toggle pressed>Bold</Toggle></Sample><Sample name="Toggle / Disabled"><Toggle disabled>Bold</Toggle></Sample><Sample name="ToggleGroup"><ToggleGroup type="single" value="center"><ToggleGroupItem value="left">Left</ToggleGroupItem><ToggleGroupItem value="center">Center</ToggleGroupItem><ToggleGroupItem value="right">Right</ToggleGroupItem></ToggleGroup></Sample></Section>
<Section name="ChoiceGroup"><Sample name="ChoiceGroup"><ChoiceGroup value="fill"><ChoiceItem value="fill">Fill</ChoiceItem><ChoiceItem value="fit">Fit</ChoiceItem><ChoiceItem value="crop">Crop</ChoiceItem></ChoiceGroup></Sample></Section>
<Section name="Tabs"><Sample name="Tabs"><Tabs value="image"><TabsList><TabsTrigger value="image">Image</TabsTrigger><TabsTrigger value="video">Video</TabsTrigger><TabsTrigger value="color">Color</TabsTrigger></TabsList><TabsContent value="image">Background options</TabsContent></Tabs></Sample></Section>
<Section name="Select"><Sample name="Select"><Select value="auto"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="auto">Auto</SelectItem><SelectItem value="1080">1080p</SelectItem></SelectContent></Select></Sample></Section>
<Section name="Card"><Sample name="Card"><Card><CardHeader><CardTitle>Recording</CardTitle><CardDescription>Project settings</CardDescription></CardHeader><CardContent>Adjust your recording.</CardContent><CardFooter><Button size="sm">Open project</Button></CardFooter></Card></Sample></Section>
<Section name="Accordion"><Sample name="Accordion / Expanded"><Accordion defaultExpandedKeys={['advanced']}><AccordionItem id="advanced"><AccordionTrigger>Advanced</AccordionTrigger><AccordionContent>Additional animation settings</AccordionContent></AccordionItem></Accordion></Sample><Sample name="Accordion / Collapsed"><Accordion><AccordionItem id="advanced"><AccordionTrigger>Advanced</AccordionTrigger><AccordionContent>Additional animation settings</AccordionContent></AccordionItem></Accordion></Sample></Section>
<Section name="Label and Separator"><Sample name="Label"><Label>Project name</Label></Sample><Sample name="Separator"><Separator/></Sample><Sample name="Skeleton"><Skeleton style={{width:260,height:60,borderRadius:8}}/></Sample></Section>
<Section name="Icons">{Object.entries({Plus,Trash,Play,Pause,Scissors,Volume2,Undo2,Redo2,ChevronDown,Settings2,MousePointer,Type,Camera,Image,Download}).map(([name,Icon])=><Sample name={'Icon / '+name}><Icon size={24}/></Sample>)}</Section>
</main>};createRoot(document.getElementById('root')!).render(<Library/>);

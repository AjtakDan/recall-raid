// DOCX uses a ZIP central directory. Extract only its document XML locally.
async function readStudyFile(file){
 if(!/\.docx$/i.test(file.name))return file.text();
 const buffer=await file.arrayBuffer(),v=new DataView(buffer),data=new Uint8Array(buffer);
 let end=data.length-22;
 for(;end>=Math.max(0,data.length-65557);end--)if(v.getUint32(end,true)===0x06054b50)break;
 if(end<0)throw Error('Invalid DOCX');
 const decoder=new TextDecoder();
 let p=v.getUint32(end+16,true);
 while(p+46<=data.length&&v.getUint32(p,true)===0x02014b50){
 const nameLen=v.getUint16(p+28,true),extra=v.getUint16(p+30,true),comment=v.getUint16(p+32,true);
 if(decoder.decode(data.subarray(p+46,p+46+nameLen))==='word/document.xml'){
 let start=v.getUint32(p+42,true);start+=30+v.getUint16(start+26,true)+v.getUint16(start+28,true);
 const bytes=data.subarray(start,start+v.getUint32(p+20,true));
 if(v.getUint32(p+24,true)>8000000)throw Error('Document too large');
 const xml=v.getUint16(p+10,true)===0?decoder.decode(bytes):await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();
 const doc=new DOMParser().parseFromString(xml,'application/xml');
 return Array.from(doc.getElementsByTagNameNS('*','p'),p=>Array.from(p.getElementsByTagNameNS('*','t'),t=>t.textContent).join('')).join('\n');
 }
 p+=46+nameLen+extra+comment;
 }
 throw Error('Missing document XML');
}

(function(){
const M={
'Image Generate':[['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&q=88','https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4'],['https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1000&q=88','https://videos.pexels.com/video-files/856857/856857-hd_1920_1080_25fps.mp4'],['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1000&q=88','https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_25fps.mp4']],
'Video Generate':[['https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1000&q=88','https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_25fps.mp4'],['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000&q=88','https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4'],['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&q=88','https://videos.pexels.com/video-files/856857/856857-hd_1920_1080_25fps.mp4']],
'Image to Video':[['https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1000&q=88','https://videos.pexels.com/video-files/856857/856857-hd_1920_1080_25fps.mp4'],['https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1000&q=88','https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_25fps.mp4'],['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1000&q=88','https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4']],
'Text to Video':[['https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1000&q=88','https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4'],['https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1000&q=88','https://videos.pexels.com/video-files/856857/856857-hd_1920_1080_25fps.mp4'],['https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1000&q=88','https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_25fps.mp4']],
'Video Extender':[['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&q=88','https://videos.pexels.com/video-files/856857/856857-hd_1920_1080_25fps.mp4'],['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000&q=88','https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_25fps.mp4']],
'Text to Song':[['assets/text-to-song.webp','https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4'],['https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1000&q=88','https://videos.pexels.com/video-files/856857/856857-hd_1920_1080_25fps.mp4'],['https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1000&q=88','https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_25fps.mp4']],
'Text to Music Video':[['assets/text-to-music-video.webp','https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4'],['https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1000&q=88','https://videos.pexels.com/video-files/856857/856857-hd_1920_1080_25fps.mp4']],
'Text to Dance Video':[['assets/text-to-dance-video.webp','https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_25fps.mp4'],['https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1000&q=88','https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4']],
'Audio / Music Generate':[['https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1000&q=88','https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4'],['https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1000&q=88','https://videos.pexels.com/video-files/856857/856857-hd_1920_1080_25fps.mp4'],['https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1000&q=88','https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_25fps.mp4']],
'More Features':[['https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&q=88','https://videos.pexels.com/video-files/856857/856857-hd_1920_1080_25fps.mp4'],['https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000&q=88','https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_25fps.mp4'],['https://images.unsplash.com/photo-1558655146-d09347e92766?w=1000&q=88','https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4']]
};
const alias={'AI Video Editor':'Image to Video'};
function attach(host,img,name,cls){
 const items=M[alias[name]||name];if(!host||!img||!items||host.dataset.sharedMedia==='1')return;host.dataset.sharedMedia='1';
 const frame=document.createElement('span');frame.className='ng-shared-media-frame '+(cls||'');img.parentNode.insertBefore(frame,img);frame.append(img);
 const video=document.createElement('video');video.className='ng-shared-media-video';video.muted=true;video.loop=true;video.playsInline=true;video.preload='none';video.setAttribute('aria-hidden','true');frame.append(video);
 let i=0,playing=false;
 function poster(n){i=n%items.length;frame.classList.remove('is-video');video.pause();video.removeAttribute('src');video.load();const test=new Image();test.onload=()=>img.src=items[i][0];test.src=items[i][0];video.src=items[i][1];video.load();}
 function play(){if(document.hidden)return;const p=video.play();if(p&&p.then)p.then(()=>{playing=true;frame.classList.add('is-video');}).catch(()=>{});}
 poster(0);
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 setInterval(()=>{if(document.hidden)return;if(playing){frame.classList.remove('is-video');video.pause();playing=false;}poster(i+1);setTimeout(play,900);},7200);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){video.pause();frame.classList.remove('is-video');playing=false;}});
}
function start(){
 document.querySelectorAll('#studio-home .reference-project-card .reference-studio-card').forEach(c=>attach(c,c.querySelector('img'),c.querySelector('.reference-card-title')?.textContent.trim()));
 const hero=document.querySelector('.hero');if(hero){const t=hero.querySelector('.ov .r')?.textContent.trim();attach(hero,hero.querySelector('img.ph'),t,'hub-hero');const thumb=hero.querySelector('.ov .th');if(thumb)attach(thumb.parentElement,thumb,t,'hub-thumb');}
 document.querySelectorAll('.list .it').forEach(x=>attach(x,x.querySelector('img'),x.querySelector('b')?.textContent.trim()));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
window.NextGenCreativeMedia={features:Object.keys(M),refresh:start};
})();
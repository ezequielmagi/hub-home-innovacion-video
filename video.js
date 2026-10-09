
// Motion is optional. Posters remain visible if playback is blocked or unsupported.
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.video-media').forEach(media=>{
 const video=media.querySelector('video');const button=media.querySelector('.video-control');
 let visible=false,userPaused=false;
 const fallback=()=>{media.classList.remove('video-playing');button.hidden=true;};
 const play=()=>{if(!visible||userPaused||motionPreference.matches)return;video.muted=true;video.play().then(()=>{media.classList.add('video-playing');button.hidden=false;button.textContent='Pausar video';button.setAttribute('aria-label','Pausar video');}).catch(fallback);};
 video.addEventListener('error',fallback);video.addEventListener('loadeddata',play);
 button.addEventListener('click',()=>{userPaused=!userPaused;if(userPaused){video.pause();button.textContent='Reproducir video';button.setAttribute('aria-label','Reproducir video');}else{play();}});
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible&&!motionPreference.matches){if(!video.getAttribute('src')){video.src=video.dataset.src;video.load();}else{play();}}else{video.pause();}},{threshold:.15});
 observer.observe(media);
 motionPreference.addEventListener('change',()=>{if(motionPreference.matches){video.pause();fallback();}else if(visible){if(!video.getAttribute('src')){video.src=video.dataset.src;video.load();}else play();}});
});

import React, { useEffect } from 'react'

const ChatBackground = () => {
    const particalContainerRef = useRef(null)

    useEffect(()=>{
        const container = particalContainerRef.current;
        if(!container)return

        while(container.firstChild){
            container.removeChild(container.firstChild)
        }

        for(let i=0;i<50;i++){
            const particle = document.createElement('div');
            particle.className = 'absolute rounded full opacity-30'

            const size = Math.random() * 5 + 3
            particle.style.width = `${size}px`
            particle.style.height = `${size}px`

            const colors = ['#5853ed', '#6c5ce7', '#8a2be2', '#9b59b6', '#3498db']
            particle.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)]

            particle.style.animation = `float ${Math.random() * 10 + 10}s infinite linear`
            particle.style.animationDelay = `${Math.random() * 15}s`;

            container.appendChild(particle)
        }
    },[])

    return(
        <div className="relative h-screen bg-gradient-to-br from-[#1a1a35] to-[#2d1a4d] text-white overflow-hidden bg-black">
          
        HI</div>
    )
}

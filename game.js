console.log(gsap);
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let hue = 0;


class Particle{
  constructor(x,y,r,velocity){
    this.x = x;
    this.y = y;
    this.r = r;
    this.velocity = velocity;
    this.color = "hsl(" + hue + ",100%,50%";
  }

  draw(){
    c.fillStyle = this.color;
    c.beginPath();
    c.arc(this.x,this.y,this.r,0,Math.PI * 2);
    c.fill();
    c.closePath();
  }

  update(){
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}



function animate(){
  c.fillStyle = "black";
  c.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach((particle,index) => {
      if(particle.r > 0.2) particle.r -= 0.2;
      if(particle.r <= 0.3) particles.splice(index,1);
  })

  particles.forEach(particle => {
    particle.update();
  })
  hue += 1;
  requestAnimationFrame(animate);
}

canvas.addEventListener("mousemove",(e) => {
  for(let i=0; i<10; i++){
    const radius = Math.floor(Math.random() * 20 + 5);
    const randomY = Math.floor(Math.random() * 3 - 1.5);
    const randomX = Math.floor(Math.random() * 3 - 1.5);

    particles.push(
      new Particle(
        e.clientX,
        e.clientY,
        radius,
        {
          x:randomX,
          y:randomY
        }
      )
    )
  }
})

animate();

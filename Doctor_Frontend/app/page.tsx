import Image from 'next/image';

const Home: React.FC = () => {
  // return (
  //   // <main className="flex min-h-screen flex-col items-center justify-between p-24">
  //   <main className="flex min-h-screen flex-col items-center justify-between p-24">
  //     <div className="relative w-full h-full">
  //       <Image
  //         src="/doctor-s-stethoscope.jpg"
  //         alt="Background Image"
  //         //layout="fill"
  //         // objectFit="cover"
  //         width={800}
  //         height={400}
  //         //style={{ position: 'absolute' }}
  //         // className="object-cover"
  //       />
  //     </div>
  //   </main>
  // );

  return(<>
  <main>
  <div className="carousel">
  <div id="slide1" className="carousel-item relative w-full">
    <img src="/team-young-specialist-doctors-standing-corridor-hospital.jpg" className="rounded-box w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
    <img src="/woman-doctor-wearing-lab-coat-with-stethoscope-isolated.jpg" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src="/smiling-doctor-with-strethoscope-isolated-grey.jpg" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide4" className="carousel-item relative w-full">
    <img src="/doctor-s-stethoscope.jpg" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
</div>
</main>
  </>)
};

export default Home;
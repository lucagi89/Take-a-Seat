'use client';
import { useEffect, useRef, useState } from 'react';

const RestaurantFloorplan = ({ restaurantId, isOwner }: { restaurantId: string, isOwner: boolean }) => {
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // const [floorplanImage, setFloorplanImage] = useState<string | null>(null);

  // // Fetch floorplan image or data for the restaurant
  // useEffect(() => {
  //   // Example: Fetch the floor plan from the database (Firebase)
  //   const fetchFloorplan = async () => {
  //     const response = await fetch(`/api/restaurants/${restaurantId}/floorplan`);
  //     const data = await response.json();
  //     setFloorplanImage(data.floorplanUrl); // Assuming we store the floor plan as an image URL
  //   };

  //   fetchFloorplan();
  // }, [restaurantId]);

  // const drawFloorplan = (context: CanvasRenderingContext2D) => {
  //   if (floorplanImage) {
  //     const img = new Image();
  //     img.src = floorplanImage;
  //     img.onload = () => {
  //       context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear the canvas
  //       context.drawImage(img, 0, 0, context.canvas.width, context.canvas.height); // Draw the image
  //     };
  //   }
  // };

  // const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
  //   if (!isOwner) return; // Only allow drawing if the user is the owner

  //   const canvas = canvasRef?.current;
  //   const context = canvas?.getContext('2d');
  //   if (context) {
  //     const rect = canvas.getBoundingClientRect();
  //     const x = e.clientX - rect.left;
  //     const y = e.clientY - rect.top;

  //     // For example: Draw a rectangle (seat) where the user clicks
  //     context.fillStyle = 'rgba(0, 0, 255, 0.5)';
  //     context.fillRect(x - 10, y - 10, 20, 20); // Draw seat
  //   }
  // };

  // const saveFloorplan = async () => {
  //   const canvas = canvasRef.current;
  //   const dataURL = canvas?.toDataURL();

  //   // Save the floorplan to the database (Firebase or other)
  //   await fetch(`/api/restaurants/${restaurantId}/save-floorplan`, {
  //     method: 'POST',
  //     body: JSON.stringify({ floorplanUrl: dataURL }),
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  // };

  // return (
  //   <div>
  //     <canvas
  //       ref={canvasRef}
  //       width={800}
  //       height={600}
  //       onClick={handleCanvasClick}
  //     />
  //     {isOwner && (
  //       <button onClick={saveFloorplan}>Save Floorplan</button>
  //     )}
  //   </div>
  // );
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context) {
      // Drawing a simple red rectangle
      context.fillStyle = 'red';
      context.fillRect(50, 50, 200, 100); // x, y, width, height
    }
  }, []);

  return (
    <div>
      <h2>Canvas Test</h2>
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        style={{ border: '1px solid black' }}
      ></canvas>
    </div>
  );
};

export default RestaurantFloorplan;

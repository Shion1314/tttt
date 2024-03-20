interface DataItem {
  longitude: string;
  latitude: string;
}

async function getCoordinates(): Promise<DataItem[]> {
  try {
    const response = await fetch(`https://bike-parking.onrender.com/Parking_data/?X=-73.941009&Y=40.618406`);
    const jsonData = await response.json();

    const allData: DataItem[] = jsonData.map((item: any) => ({
      longitude: item.x_coordinate.toString(),
      latitude: item.y_coordinate.toString(),
    }));

    return allData;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
}

export default getCoordinates;

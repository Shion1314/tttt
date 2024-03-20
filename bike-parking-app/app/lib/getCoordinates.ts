interface DataItem {
  longitude: string;
  latitude: string;
}

// Utilize parallel data fetching
async function getCoordinates(): Promise<DataItem[]> {
  try {
    let allData: DataItem[] = [];
    let hasMoreData = true;
    let page = 1;

    while (hasMoreData) {
      const response = await fetch(`https://bike-parking.onrender.com/Parking_data/?X=-73.941009&Y=40.618406&page=${page}`);
      const jsonData = await response.json();

      const data: DataItem[] = jsonData.map((item: any) => ({
        longitude: item.x_coordinate.toString(),
        latitude: item.y_coordinate.toString(),
      }));

      if (data.length === 0) {
        hasMoreData = false;
      } else {
        allData = [...allData, ...data];
        page++; // Increment page for next request
      }
    }

    return allData;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
}

export default getCoordinates;

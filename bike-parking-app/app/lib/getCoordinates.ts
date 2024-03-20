interface DataItem {
  longitude: string;
  latitude: string;
}

let cachedData: DataItem[] | null = null;

async function getCoordinates(): Promise<DataItem[]> {
  try {
    if (cachedData !== null) {
      return cachedData;
    }

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

    // Cache the fetched data
    cachedData = allData;

    return allData;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
}

export default getCoordinates;

import axios from 'axios';
import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';
import Config from 'react-native-config';

type Meta = {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
  same_name: {
    region: string[];
    keyword: string;
    selected_region: string;
  };
};

export type RegionInfo = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

type RegionResponse = {
  meta: Meta;
  documents: RegionInfo[];
};

function useSearchLocation(keyword: string, location: LatLng) {
  const [pageParam, setPageParam] = useState(1);
  const [regionInfo, setRegionInfo] = useState<RegionInfo[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get<RegionResponse>(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}&y=${location.latitude}&x=${location.longitude}&$page=${pageParam}`,
          {
            headers: {
              Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`,
            },
          },
        );
        // console.log(data);
        setRegionInfo(data.documents);
      } catch (error) {
        console.log(error);
        setRegionInfo([]);
      }
    })();
  }, [keyword, location]);

  return {regionInfo};
}

export default useSearchLocation;

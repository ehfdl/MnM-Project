import { Dimensions } from "react-native";

// Dimensions API를 통해서 실제 스크린너비와 높이값을 구할 수 있습니다.
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

export const getImgPath = (path) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};

// export const getPath = (content) => {
//   return `https://api.themoviedb.org/3/movie/${content}?api_key=6bef5fd5109a0d603ca0648fc8f8cb45&language=en-US&page=1`;
// };
export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const pwRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

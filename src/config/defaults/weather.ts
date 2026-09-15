import type { WeatherConfig } from "../../types/config";

export const defaultWeatherConfig: WeatherConfig = {
	enable: true, // 启用天气组件
	apiKey: "", // OpenWeatherMap API Key，请前往 https://openweathermap.org/api 申请
	defaultLocation: "", // 默认位置，例如 "Beijing,CN"
	unit: "celsius", // 温度单位："celsius" 摄氏度，"fahrenheit" 华氏度
};

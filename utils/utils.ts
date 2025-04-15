import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";

export const openBrowser = async (url: string) => {
  if (url) {
    const result = await WebBrowser.openBrowserAsync(url as string);
    if (result.type === "dismiss") {
      router.back();
    }
  }
};

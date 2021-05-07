import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../store/actions/app";
import { ReduxState } from "../types/redux";
import { ThemeName } from "../types/theme";

export function useTheme() {
  const theme = useSelector(({ app }: ReduxState) => app.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.classList.remove(
      ...(["classic", "radioactive"] as ThemeName[])
    );
    document.body.classList.add(theme);
  }, [theme]);

  const _setTheme = (themeName: ThemeName) => dispatch(setTheme(themeName));

  return [theme, _setTheme] as const;
}

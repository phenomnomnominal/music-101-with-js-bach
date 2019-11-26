import React from 'react';

import wallpaper from '../../assets/wallpaper.png';

export function ContentWallpaper() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
            html {
                background-image: url('${wallpaper}');
            }

            div[class$='-Zoom']{
              background-image: url('${wallpaper}');
            }
        `
      }}
    ></style>
  );
}

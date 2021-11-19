const loadImg = (url: string): Promise<HTMLImageElement> => {
  return new Promise(resolve => {
    var img = new Image();
    img.onload = () => resolve(img);
    img.src = url;
  });
};

export type Images = {
  [name: string]: HTMLImageElement;
};

const toUrl = (name: string): string => `assets/img/${name}`;

export function loadAllImages(names: string[]): Promise<Images> {
  return new Promise(resolve => {
    var images: Images = {};
    var promises = names.map(n =>
      loadImg(toUrl(n)).then(img => (images[n] = img))
    );
    Promise.all(promises).then(_ => resolve(images));
  });
}

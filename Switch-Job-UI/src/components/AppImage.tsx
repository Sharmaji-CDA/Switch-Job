interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
  [key: string]: any;
}

function Image({
  src,
  alt = "Image Name",
  className = "",
  ...props
}: ImageProps) {

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e: any) => {
        e.target.src = "/assets/images/no_image.png"
      }}
      {...props}
    />
  );
}

export default Image;

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

interface Props {
  src: StaticImageData;
  href: string;
}

export default function RoutingButton(p: Props) {
  const router = useRouter();

  const routing = useCallback(() => {
    router.push(p.href);
  }, []);

  return (
    <button onClick={routing}>
      <Image src={p.src} alt="icon" />
    </button>
  );
}

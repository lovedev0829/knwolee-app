import { ButtonProps } from '@chakra-ui/react';
import { FC, ReactNode, SVGProps } from 'react';

export type MenuProps = {
  icon: FC<SVGProps<SVGSVGElement>>;
  title: string | ReactNode;
  route: string;
} & ButtonProps;
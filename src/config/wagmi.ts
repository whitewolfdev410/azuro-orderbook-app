import { getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { chiliz, gnosis, polygon, polygonAmoy, spicy } from 'viem/chains';

const { wallets } = getDefaultWallets();

const chains = [polygonAmoy, gnosis, polygon, chiliz, spicy] as const;

const wagmiConfig = getDefaultConfig({
  appName: 'Azuro',
  projectId: '2f82a1608c73932cfc64ff51aa38a87b', // get your own project ID - https://cloud.walletconnect.com/sign-in
  wallets,
  chains,
  ssr: false,
});

export default wagmiConfig;

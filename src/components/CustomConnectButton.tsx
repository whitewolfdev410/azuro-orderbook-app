import { ConnectButton } from '@rainbow-me/rainbowkit';
import Icons, { EIcons } from './Icons';
import { AvatarComponent } from '@rainbow-me/rainbowkit';
import { emojiAvatarForAddress } from '@/utils/rainbowAvatar';
import { useBreakpoints } from '@/hooks/useBreakpoints';

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  const emoji = emojiAvatarForAddress(address);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: emoji?.color
      }}
    >
      {emoji?.emoji}
    </div>
  );
};

const CustomConnectButton = () => {
  const breakpoints = useBreakpoints();
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
          // {...(!ready && {
          //   'aria-hidden': true,
          //   className: 'opacity-0 pointer-events-none select-none'
          // })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="rounded-[12px] text-sm font-normal px-4 py-2 text-white"
                    style={{
                      background:
                        'linear-gradient(253.66deg, #FF65A6 12.88%, #B37ED3 50.05%, #5E64EB 88.76%)'
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Icons name={EIcons.CONNECT_WALLET} />
                      Connect wallet
                    </div>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="bg-red-500 rounded-lg px-4 py-2 text-white"
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="flex gap-3">
                  {/* <button
                    onClick={openChainModal}
                    className="flex items-center bg-blue-500 rounded-lg px-4 py-2 text-white"
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        className="bg-cover w-3 h-3 rounded-full overflow-hidden mr-1"
                        style={{ background: chain.iconBackground }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            className="w-3 h-3"
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button> */}

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="flex items-center bg-[#FFFFFF0D] rounded-xl px-4 py-2 text-white gap-3 whitespace-nowrap"
                  >
                    {!breakpoints.isXs && (
                      <span className="font-normal text-xs whitespace-nowrap">
                        {account.displayBalance}
                      </span>
                    )}
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 min-w-[26px] min-h-[26px] rounded-full flex items-center justify-center">
                      <CustomAvatar address={account.address} size={26} />
                    </div>
                    {breakpoints.isLg && (
                      <span className="font-medium text-xs text-[#FFFFFF99] whitespace-nowrap">
                        {account.displayName}
                      </span>
                    )}
                    <Icons name={EIcons.CHEVRON_DOWN} />
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;

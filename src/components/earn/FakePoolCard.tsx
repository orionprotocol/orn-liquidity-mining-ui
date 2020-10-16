import React from 'react'
import {AutoColumn} from '../Column'
import {RowBetween} from '../Row'
import styled from 'styled-components'
import {StyledInternalLink, TYPE} from '../../theme'
import DoubleCurrencyLogo from '../DoubleLogo'
import {ChainId, ETHER, JSBI, TokenAmount} from '@uniswap/sdk'
import {ButtonPrimary} from '../Button'
import {StakingInfo} from '../../state/stake/hooks'
import {useColor} from '../../hooks/useColor'
import {currencyId} from '../../utils/currencyId'
import {Break, CardBGImage, CardNoise} from './styled'
import {unwrappedToken, wrappedCurrency} from '../../utils/wrappedCurrency'
import {useTotalSupply} from '../../data/TotalSupply'
import {usePair} from '../../data/Reserves'
import useUSDCPrice from '../../utils/useUSDCPrice'
import {CardInfo} from "../../pages/Earn";
import {useWalletModalToggle} from "../../state/application/hooks";

const StatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;
`
// ${({ theme }) => theme.mediaWidth.upToSmall`
//   display: none;
// `};

const Wrapper = styled(AutoColumn)<{ showBackground: boolean; bgColor: any }>`
  border-radius: 12px;
  width: 100%;
  overflow: hidden;
  position: relative;
  opacity: ${({ showBackground }) => (showBackground ? '1' : '1')};
  background: ${({ theme, bgColor, showBackground }) =>
    `radial-gradient(91.85% 100% at 1.84% 0%, ${bgColor} 0%, ${showBackground ? theme.black : theme.bg5} 100%) `};
  color: ${({ theme, showBackground }) => (showBackground ? theme.white : theme.text1)} !important;

  ${({ showBackground }) =>
    showBackground &&
    `  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);`}
`

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr 120px;
  grid-gap: 0px;
  align-items: center;
  padding: 1rem;
  z-index: 1;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 48px 1fr 96px;
  `};
`

// const APR = styled.div`
//   display: flex;
//   justify-content: flex-end;
// `

const BottomSection = styled.div<{ showBackground: boolean }>`
  padding: 12px 16px;
  opacity: ${({ showBackground }) => (showBackground ? '1' : '0.4')};
  border-radius: 0 0 12px 12px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  z-index: 1;
`

export default function FakePoolCard({ cardInfo }: { cardInfo: CardInfo }) {
  const toggleWalletModal = useWalletModalToggle()

  return (
    <Wrapper showBackground={false} bgColor={'#2172E5'}>
      <CardBGImage desaturate />
      <CardNoise />

      <TopSection>
        <DoubleCurrencyLogo currency0={cardInfo.currency0} currency1={cardInfo.currency1} size={24} />
        <TYPE.white fontWeight={600} fontSize={24} style={{ marginLeft: '8px' }}>
          {cardInfo.currency0.symbol}-{cardInfo.currency1.symbol}
        </TYPE.white>

          <ButtonPrimary padding="8px" borderRadius="8px" onClick={() => toggleWalletModal()}>
            {'Deposit'}
          </ButtonPrimary>
      </TopSection>

      <StatContainer>
        <RowBetween>
          <TYPE.white> Total deposited</TYPE.white>
          <TYPE.white>
            {cardInfo.totalDeposited}
          </TYPE.white>
        </RowBetween>
        <RowBetween>
          <TYPE.white> Pool rate </TYPE.white>
          <TYPE.white>{cardInfo.poolRate}</TYPE.white>
        </RowBetween>
        <RowBetween>
          <TYPE.white> Bonus pool </TYPE.white>
          <TYPE.white>24,000 ORN / month</TYPE.white>
        </RowBetween>
      </StatContainer>
    </Wrapper>
  )
}

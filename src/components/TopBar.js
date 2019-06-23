import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LanguageSelect from './LanguageSelect';
import PeriodSelect from './PeriodSelect';

const TopBar = ({
  luckyRepository,
  onChangeLanguageOption,
  selectedLanguageOption,
  onChangePeriodValue,
  selectedPeriodValue,
}) => {
  return (
    <Container>
      <SelectorsContainer>
        <SelectWrapper>
          <LanguageSelect
            selectedOption={selectedLanguageOption}
            onChange={onChangeLanguageOption}
          />
        </SelectWrapper>
        <SelectWrapper width={180}>
          <PeriodSelect
            selectedValue={selectedPeriodValue}
            onChange={onChangePeriodValue}
          />
        </SelectWrapper>
      </SelectorsContainer>
    </Container>
  );
};

TopBar.propTypes = {
  luckyRepository: PropTypes.object,
  selectedLanguageOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  onChangeLanguageOption: PropTypes.func.isRequired,
  selectedPeriodValue: PropTypes.string,
  onChangePeriodValue: PropTypes.func.isRequired,
};

export default React.memo(TopBar);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0 16px;
  height: 56px;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.14),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

const SelectorsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SelectWrapper = styled.div`
  width: ${props => (props.width ? props.width : 150)}px;
  margin-right: 8px;
`;

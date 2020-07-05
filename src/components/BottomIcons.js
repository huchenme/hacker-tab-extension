/** @jsx jsx */
import React, { useState, useRef } from 'react';
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickAway } from 'react-use';

import { dark } from '../theme';
import featureToggles from '../feature-toggles';
import { ReactComponent as MoonIcon } from '../images/moon.svg';
import { ReactComponent as SunIcon } from '../images/sun.svg';
import { ReactComponent as SettingIcon } from '../images/setting.svg';

import ScrollTop from './ScrollTop';

const margin = '20px';

export default function BottomIcons({ isDark = false, setIsDark }) {
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const ref = useRef(null);
  useClickAway(ref, () => {
    setIsSettingOpen(false);
  });

  return (
    <React.Fragment>
      <div
        css={css`
          position: fixed;
          right: ${margin};
          bottom: ${margin};
          display: flex;
        `}
      >
        <ScrollTop
          css={css`
            margin-right: 16px;
          `}
          aria-label="Scroll to Top Button"
        />
        <ActionButton
          onClick={() => {
            setIsDark(!isDark);
          }}
          whileTap={{ scale: 0.8 }}
          isRotate={isDark}
          aria-label="Toggle Dark Mode Button"
        >
          <AnimatePresence>
            {isDark ? (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.3,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  transition: { duration: 0.2 },
                }}
              >
                <SunIcon
                  aria-label="Sun Icon"
                  css={css`
                    fill: currentColor;
                    height: 20px;
                    width: 20px;
                  `}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.3,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  transition: { duration: 0.2 },
                }}
              >
                <MoonIcon
                  aria-label="Moon Icon"
                  css={css`
                    fill: currentColor;
                    height: 20px;
                    width: 20px;
                  `}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </ActionButton>
      </div>

      {Boolean(featureToggles.settings) && (
        <div
          ref={ref}
          css={css`
            position: fixed;
            left: ${margin};
            bottom: ${margin};
            display: flex;
          `}
        >
          <ActionButton
            isRotate
            isRotated={isSettingOpen}
            whileTap={{ scale: 0.8 }}
            onClick={() => {
              setIsSettingOpen(!isSettingOpen);
            }}
          >
            <SettingIcon
              css={css`
                fill: currentColor;
                height: 20px;
                width: 20px;
              `}
            />
          </ActionButton>
          <AnimatePresence>
            {isSettingOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.3,
                  y: 50,
                  x: -50,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  y: 50,
                  x: -50,
                }}
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                css={css`
                  width: 200px;
                  height: 200px;
                  background: ${dark(9)};
                  position: absolute;
                  bottom: 30px;
                  left: 0;
                  border-radius: 5px;
                  color: white;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                `}
              >
                test
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </React.Fragment>
  );
}

BottomIcons.propTypes = {
  isDark: PropTypes.bool,
  setIsDark: PropTypes.func.isRequired,
};

const ActionButton = styled(motion.button)`
  position: relative;
  background-color: transparent;
  margin: 0;
  padding: 0;
  line-height: 1;
  transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  height: 20px;
  width: 20px;
  outline: none;
  color: ${(props) => props.theme.icon.color};

  svg {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    transform: ${(props) => (props.isRotated ? 'rotate(45deg)' : 'none')};
  }

  &:hover {
    color: ${(props) => props.theme.icon.hoverColor};

    svg {
      transform: ${(props) => (props.isRotate ? 'rotate(45deg)' : 'none')};
    }
  }
`;

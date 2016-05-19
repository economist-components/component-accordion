import 'babel-polyfill';
import React from 'react';
import Accordion from './';
import cardData from '@economist/component-sections-card/lib/context';
// Force media links to use icon as background.
cardData.media.map((mediaLink) => {
  mediaLink.icon = {
    useBackground: true,
    color: 'chicago',
    icon: mediaLink.meta,
  };
  return mediaLink;
});
const accordionData = [
  {
    title: 'Sections',
    href: 'http://www.economist.com/sections',
    children: cardData.sections,
  },
  {
    title: 'Blogs',
    href: 'http://www.economist.com/blogs',
    children: cardData.blogs,
  },
  ...cardData.media,
  {
    title: 'Print Edition',
    href: 'http://www.economist.com/printedition/',
  },
  {
    title: 'Products',
    href: 'http://www.economist.com/digital',
  },
  {
    title: 'Subscribe',
    href: 'https://subscriptions.economist.com/',
    target: '_blank',
    unstyled: false,
  },
];
export default (
  <Accordion list={accordionData} />
);

import dangerImg from '@assets/ptw/danger-cats/categories.png';
import electric from '@assets/ptw/danger-cats/electric.png';
import prev1 from '@assets/ptw/prev-cats/prev1.png';
import prev2 from '@assets/ptw/prev-cats/prev2.png';
import prev3 from '@assets/ptw/prev-cats/prev3.png';
import sub1 from '@assets/ptw/prev-cats/sub1.png';
import sub2 from '@assets/ptw/prev-cats/sub2.png';
import sub3 from '@assets/ptw/prev-cats/sub3.png';
import bio from '@assets/bio.jpg';

export const tempDate = {
  'danger-categories': [
    {
      id: 'general-danger',
      label: 'General dangers',
      images: [dangerImg],
      active: false,
      subCategories: [
        {
          id: '01',
          label: 'Danger A',
          images: [electric],
          active: false,
        },
        {
          id: '02',
          label: 'Danger B',
          images: [electric],
          active: false,
        },
        {
          id: '03',
          label: 'Danger C',
          images: [bio],
          active: false,
        },
      ],
    },
    {
      id: 'excavation-works',
      label: 'Excavation works',
      images: [dangerImg, dangerImg, prev1],
      active: true,
      subCategories: [
        {
          id: '01',
          label: 'Work A',
          images: [bio],
          active: false,
        },
        {
          id: '02',
          label: 'Work B',
          images: [electric],
          active: false,
        },
        {
          id: '03',
          label: 'Work C',
          images: [bio],
          active: false,
        },
      ],
    },
    {
      id: 'welding-works',
      label: 'Welding Works',
      images: [bio],
      active: true,
    },
    {
      id: 'machinerie',
      label: 'Machineries',
      images: [dangerImg],
      active: false,
    },
    {
      id: 'scaffolding',
      label: 'Scaffolding',
      images: [dangerImg],
      active: true,
    },
  ],
  'cat-prev': [
    {
      id: 'example1',
      label: 'Example 1',
      images: [prev1],
      active: true,
      subCategories: [
        {
          id: '01',
          label: 'Danger A',
          images: [sub1],
          active: true,
        },
        {
          id: '02',
          label: 'Danger B',
          images: [sub2],
          active: true,
        },
        {
          id: '03',
          label: 'Danger C',
          images: [sub3],
          active: true,
        },
      ],
    },
    {
      id: 'example2',
      label: 'Example 2',
      images: [prev2],
      active: true,
    },
    {
      id: 'example3',
      label: 'Example 3',
      images: [prev1],
      active: false,
    },
    {
      id: 'example4',
      label: 'Example 4',
      images: [prev3],
      active: true,
    },
    {
      id: 'example5',
      label: 'Example 5',
      images: [prev1],
      active: true,
    },
  ],
};

let cv = 
  { 
    work: {
      title: 'work',
      list: [
        {
          name: 'Tactile Games',
          description: 'Cinematic Artist',
          period: ['2023','']
        },
        {
          name: 'Sun Creature Studio',
          description: 'Executive Producer | Dev. Producer',
          period: ['2019','2021']
        },
        {
          name: 'Monkey Tennis Animation',
          description: 'Co-founder | Producer | CG Artist',
          period: ['2014', '2020']
        },
        {
          name: 'MPC Advertising',
          description: 'CG Artist',
          period: ['2013', '2014']
        }
      ]
    },
    education: {
      title: 'education',
      list: [
        {
          name: 'Codecademy',
          description: 'Fullstack Development | Online course',
          period: ['2022', '']
        },
        {
          name: 'Animation Sans Frontieres',
          description: 'Project Development | Diploma',
          period: ['2014', '2015']
        },
        {
          name: 'The Animation Workshop',
          description: 'CG Artist | Bachelor',
          period: ['2010', '2014']
        },
        {
          name: 'The Drawing Academy',
          description: 'Traditional Drawing | Diploma',
          period: ['2008', '2008']
        }
      ]
    },
    awards: {
      title: 'awards',
      list: [
        {
          name: 'Annecy Film Festival',
          description: 'Interview | Junior Jury Award',
          period: ['2014']
        },
        {
          name: 'Aarhus Film Festival',
          description: 'Interview | Best Talent Film',
          period: ['2014']
        },
        {
          name: 'Hollyshorts Film Festival',
          description: 'Interview | Best Animation',
          period: ['2014']
        }
      ]
    },
    software: {
      title: 'software',
      list: [
        {
          name: 'Web',
          description: 'HTML | CSS | JavaScript | Jquery | React | Node | Three | MySql | Wordpress | GitHub',
          period: ['']
        },
        {
          name: 'CG',
          description: 'Photoshop | Premiere | After Effects | Nuke | Maya | Arnold | Redshift | Vray | Zbrush | Substance | 3D Coat | Unreal | Resolve',
          period: ['']
        },
        {
          name: 'Production',
          description: 'Google Drive | Microsoft Office | Shotgrid',
          period: ['']
        }
    
      ]
    }
          
  };


export function getCV() {
    return cv;
  }
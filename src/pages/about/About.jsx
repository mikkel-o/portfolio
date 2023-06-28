import React from 'react';
import List from '../../components/List/List';
import Software from '../../components/Software/Software.jsx';
import {getCV} from './cv';
import './About.css';


export default function About() {
  const cv = getCV();
  return (
    <div className={'wrapper'}>
      <div className={"test"}></div>
      <main id="about-wrapper">

        <section className="about-section">
          <div className={'about-column about-column--fixed'}>
          {/*<div className={'about-photo-wrapper'}>
                <img alt={'profile'} src={'/img/placeholder.jpeg'}></img>
            </div>*/}
            
            <h3 className={`cv-list__name list__name`}>About me</h3>
            <p>
            <br/>
            My name is Mikkel. I am a freelance CG generalist and animation 
            producer based in Copenhagen, Denmark. 
            <br/>
            I have worked with <a href={'/projects?filters=3D+animation&method=OR'}>3D animation</a>, <a href={'/projects?filters=2D+animation&method=OR'}>2D animation</a> and <a href={'/projects?filters=visual+effects&method=OR'}>visual effects</a> for more than a decade - as an <a href={'/projects?filters=3D+artist&method=OR'}>artist</a>, <a href={'/projects?filters=producer%2Cexecutive+producer%2Cdevelopment+producer&method=OR'}>producer</a>, supervisor and <a href={'/projects?filters=editor&method=OR'}>editor</a>.
            <br/><br/>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sollicitudin, magna a tempor tincidunt, turpis leo pellentesque quam, vel vulputate metus ante vitae enim.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sollicitudin, magna a tempor tincidunt, turpis leo pellentesque quam, vel vulputate metus ante vitae enim.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sollicitudin, magna a tempor tincidunt, turpis leo pellentesque quam, vel vulputate metus ante vitae enim.
            <br/><br/>
            Please <a href={'/contact'}>get in touch</a>, if you have any questions about my work or would like to discuss a project or potential collaboration.
          </p>
          
          
          </div>
          <div className={'about-column'}>
         
          <List 
                  title={cv.work.title} 
                  list={cv.work.list} 
                  prefix={'cv'}
                />
                <List 
                  title={cv.education.title} 
                  list={cv.education.list} 
                  prefix={'cv'} 
                />
                <List 
                  title={cv.awards.title} 
                  list={cv.awards.list} 
                  prefix={'cv'} 
                />
                {/*<List 
                  title={cv.software.title} 
                  list={cv.software.list} 
                  prefix={'cv'} 
                />*/}
                <Software /> 
                </div>
                
        </section>
      </main>
    </div>
  );
}



/*
 {isMobile ?
  <FiltersMobile items={allProjects} filters={objs} allFilters={fil} filteredItems={allFilteredProjects} pseudoFilteredItems={allPseudoFilteredProjects}/>
      : 
        <header className={'projects-header'} >
        <Filters filtersTitles={filtersTitles}/>
        </header>
      }
*/
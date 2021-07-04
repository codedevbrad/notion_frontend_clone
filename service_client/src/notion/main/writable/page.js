import React , { useEffect , useContext }  from 'react';
import { useParams } from "react-router-dom";

import { HeadSeo } from '../../../randoms/seoTag';

import { AppContext } from './context';

import PageHeading   from './main/pageHeading';
import PageWritable  from './main/pageWritable';

import TooltipHighlight from './tooltips/tooltip.highlight';
import TooltipSection   from './tooltips/tooltip.section';
import BlockCreation    from './tooltips/tooltip.blockCreator';

import useSelection from './useEffects/useSelection';
import usePageBindListeners from './main/functions/handleBindListener';

import './styles.scss'; 


// LOGGED IN AND YOU HAVE ACCESS TO PAGE ...

// pass writable as props?

const NotionPage = ( ) => {

    const { getSingleWritable , dragSelection , updateDragSelection , togglecanEdit , handleWrtableBlockUpdate } = useContext( AppContext );

    const itemsSelected = ({ items, event }) => {
          let arraySelected = [ ];
          items.forEach( ( item , i ) => {
                let id = parseInt( item.getAttribute('data-editable-id') );
                arraySelected.push( id );
          });
          updateDragSelection({
              ...dragSelection , selected: arraySelected
          });
    }

    const handleBlockCreation = async ( evt ) => {
          let isOutOfElement = evt.classList[0] == 'page_right';
          if ( isOutOfElement && !dragSelection.canDrag ) {
               await handleWrtableBlockUpdate( 'fresh' );
          }
    }

    usePageBindListeners();
    useSelection( dragSelection.canDrag , itemsSelected );

    
    let { idroom } = useParams();

    useEffect( (  ) => {
         
         console.log('get page data for' , idroom );
         getSingleWritable( idroom )

    } , [ idroom ] );


    return (
        <div className="Page">

              <HeadSeo title={ 'individual page' } description={ 'each indidvidual page'} keywords={ 'manage your thoughts' }/>

              <TooltipHighlight />

              <BlockCreation />
 
              <div className="page_top">

                  <div className="page_top_titlecard">
                     <h3> Heading </h3>
                  </div>
                  <div className="page_top_heading">
                     <PageHeading />
                  </div>
              </div>

              <div className="page_bottom">
                  <div className="page_left">
                      <TooltipSection />
                  </div>

                  <div className={ `page_right scrollbar`} onClick={ ( evt ) => handleBlockCreation( evt.target ) } >
                      <p className={ `edit_control ${ dragSelection.canDrag ? 'edit_control_on' : ''  } `} onClick={ () => togglecanEdit() }>
                          <i className="fas fa-edit"></i>
                      </p>
                      <PageWritable />
                  </div>
              </div>
        </div>
    )
}


export default NotionPage;
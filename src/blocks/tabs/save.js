/**
 * BLOCK: Kadence Tabs
 */
import classnames from 'classnames';
import times from 'lodash/times';
import GenIcon from '../../genicon';
import Ico from '../../svgicons';
import FaIco from '../../faicons';
const {
	Component,
	Fragment,
} = wp.element;
const {
	InnerBlocks,
	RichText,
} = wp.editor;
/**
 * Internal block libraries
 */
const { __, sprintf } = wp.i18n;

class KadenceTabsSave extends Component {
	stripStringRender( string ) {
		return string.toLowerCase().replace( /[^0-9a-z-]/g, '' );
	}
	render() {
		const { attributes: { tabCount, blockAlignment, currentTab, mobileLayout, layout, tabletLayout, uniqueID, titles, iSize, maxWidth, tabAlignment, startTab } } = this.props;
		const layoutClass = ( ! layout ? 'tabs' : layout );
		const tabLayoutClass = ( ! tabletLayout ? 'inherit' : tabletLayout );
		const mobileLayoutClass = ( ! mobileLayout ? 'inherit' : mobileLayout );
		const accordionClass = ( ( mobileLayout && 'accordion' === mobileLayout ) || ( tabletLayout && 'accordion' === tabletLayout ) ? 'kt-create-accordion' : '' );
		const classId = ( ! uniqueID ? 'notset' : uniqueID );
		const classes = classnames( `align${ blockAlignment }` );
		const activeTab = ( startTab ? startTab : currentTab );
		const innerClasses = classnames( `kt-tabs-wrap kt-tabs-id${ classId } kt-tabs-has-${ tabCount }-tabs kt-active-tab-${ activeTab } kt-tabs-layout-${ layoutClass } kt-tabs-tablet-layout-${ tabLayoutClass } kt-tabs-mobile-layout-${ mobileLayoutClass } kt-tab-alignment-${ tabAlignment } ${ accordionClass }` );
		const renderTitles = ( index ) => {
			return (
				<Fragment>
					<li id={ `tab-${ ( titles[ index ] && titles[ index ].text ? this.stripStringRender( titles[ index ].text.toString() ) : this.stripStringRender( __( 'Tab' ) + ( 1 + index ) ) ) }` } className={ `kt-title-item kt-title-item-${ 1 + index } kt-tabs-svg-show-${ ( titles[ index ] && titles[ index ].onlyIcon ? 'only' : 'always' ) } kt-tabs-icon-side-${ ( titles[ index ] && titles[ index ].iconSide ? titles[ index ].iconSide : 'right' ) } kt-tab-title-${ ( 1 + index === activeTab ? 'active' : 'inactive' ) }` }>
						<a href={ `#tab-${ ( titles[ index ] && titles[ index ].text ? this.stripStringRender( titles[ index ].text.toString() ) : this.stripStringRender( __( 'Tab' ) + ( 1 + index ) ) ) }` } data-tab={ 1 + index } className={ `kt-tab-title kt-tab-title-${ 1 + index } ` } >
							{ titles[ index ] && titles[ index ].icon && 'right' !== titles[ index ].iconSide && (
								<GenIcon className={ `kt-tab-svg-icon kt-tab-svg-icon-${ titles[ index ].icon } kt-title-svg-side-${ titles[ index ].iconSide }` } name={ titles[ index ].icon } size={ ( ! iSize ? '14' : iSize ) } icon={ ( 'fa' === titles[ index ].icon.substring( 0, 2 ) ? FaIco[ titles[ index ].icon ] : Ico[ titles[ index ].icon ] ) } htmltag="span" />
							) }
							<RichText.Content
								tagName="span"
								value={ ( titles[ index ] && titles[ index ].text ? titles[ index ].text : sprintf( __( 'Tab %d' ), ( 1 + index ) ) ) }
								className={ 'kt-title-text' }
							/>
							{ titles[ index ] && titles[ index ].icon && 'right' === titles[ index ].iconSide && (
								<GenIcon className={ `kt-tab-svg-icon kt-tab-svg-icon-${ titles[ index ].icon } kt-title-svg-side-${ titles[ index ].iconSide }` } name={ titles[ index ].icon } size={ ( ! iSize ? '14' : iSize ) } icon={ ( 'fa' === titles[ index ].icon.substring( 0, 2 ) ? FaIco[ titles[ index ].icon ] : Ico[ titles[ index ].icon ] ) } htmltag="span" />
							) }
						</a>
					</li>
				</Fragment>
			);
		};
		return (
			<div className={ classes } >
				<div className={ innerClasses } style={ {
					maxWidth: ( maxWidth ? maxWidth + 'px' : 'none' ),
				} }>
					<ul className="kt-tabs-title-list">
						{ times( tabCount, n => renderTitles( n ) ) }
					</ul>
					<div className="kt-tabs-content-wrap">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	}
}
export default KadenceTabsSave;

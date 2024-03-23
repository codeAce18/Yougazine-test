import {Drawer} from '@components/common/drawer/drawer';
import FilterIcon from '@components/icons/filter-icon';
import {useUI} from '@contexts/ui.context';
import FilterSidebar from '@components/search/filter-sidebar';
import ListBox from '@components/ui/filter-list-box';
import {useTranslation} from 'src/app/i18n/client';
import {getDirection} from '@utils/get-direction';
import motionProps from '@components/common/drawer/motion';

interface Props {
    onNavClick: any;
    viewAs: boolean;
    lang: string;
}

const SearchTopBar: React.FC<Props> = ({onNavClick, viewAs,lang}) => {
    const {openFilter, displayFilter, closeFilter} = useUI();
    const {t} = useTranslation(lang, 'common');
    const dir = getDirection(lang);
    const contentWrapperCSS = dir === 'ltr' ? {left: 0} : {right: 0};
    return (
        <div className="flex items-center justify-between mb-6 filters-panel">
            {/* <button
                className="flex items-center px-4 py-2 text-sm font-semibold transition duration-200 ease-in-out border rounded-md lg:hidden text-brand-dark border-border-base focus:outline-none hover:border-brand hover:text-brand"
                onClick={openFilter}
            >
                <FilterIcon/>
                <span className="ltr:pl-2.5 rtl:pr-2.5">{t('text-filters')}</span>
            </button> */}
            
            <div className="flex items-center justify-end w-full lg:justify-between">
                <div className="list-view">
                    <div className="btn btn-gridview text-skin-base text-opacity-70">View as:</div>
                    <button type="button" id="grid-5" className={`btn btn-view grid ${viewAs && 'active' || ''}`}
                            onClick={() => onNavClick(!viewAs)}>
                        <div>
                            <div className="icon-bar"></div>
                            <div className="icon-bar"></div>
                            <div className="icon-bar"></div>
                        </div>
                    </button>
                    <button type="button" id="list-view" className={`btn btn-view list ${!viewAs && 'active' || ''}`}
                            onClick={() => onNavClick(!viewAs)}>
                        <div>
                            <div className="icon-bar"></div>
                            <div className="icon-bar"></div>
                            <div className="icon-bar"></div>
                        </div>
                    </button>
                </div>
                <ListBox
                    options={[
                        {name: 'text-lowest-price', value: 'lowest'},
                        {name: 'text-highest-price', value: 'highest'},
                        {name: 'text-new-arrival', value: 'new-arrival'},
                        {name: 'text-most-order', value: 'most-order'},
                    ]}
                    lang={lang}
                />
            </div>
            {/*TODO: multiple drawer uses throughout the app is a bad practice */}
            <Drawer
                placement={dir === 'rtl' ? 'right' : 'left'}
                open={displayFilter}
                onClose={closeFilter}
                // @ts-ignore
                level={null}
                contentWrapperStyle={contentWrapperCSS}
                {...motionProps}
            >
                <FilterSidebar lang={lang}/>
            </Drawer>
        </div>
    );
}
export default SearchTopBar;

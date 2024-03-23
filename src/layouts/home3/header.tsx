import {useRef, useState} from 'react';
import dynamic from 'next/dynamic';
import {siteSettings} from '@settings/site-settings';
import {ROUTES} from '@utils/routes';
import {useUI} from '@contexts/ui.context';
import {useActiveScroll} from '@utils/use-active-scroll';
import Container from '@components/ui/container';
import Logo from '@components/ui/logo';
import SearchIcon from '@components/icons/search-icon';
import HeaderMenu from '@layouts/header/header-menu';
import {AiOutlineUser} from 'react-icons/ai';
import {useModalAction} from '@components/common/modal/modal.context';
import cn from 'classnames';
import Search from '@components/common/search';
import {FiMenu} from 'react-icons/fi';
import CategoryDropdownMenu from '@components/category/category-dropdown-menu';
import {useTranslation} from 'src/app/i18n/client';

const AuthMenu = dynamic(() => import('@layouts/header/auth-menu'), {
    ssr: false,
});
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
    ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const {site_header} = siteSettings;

function Header({lang}: { lang: string }) {
    const {openSidebar, displaySearch, openSearch, isAuthorized, displayMobileSearch} = useUI();
    const {openModal} = useModalAction();
    const siteSearchRef = useRef() as DivElementRef;
    const {t} = useTranslation(lang, 'common');
    const siteHeaderRef = useRef() as DivElementRef;
    const [categoryMenu, setCategoryMenu] = useState(Boolean(false));
    useActiveScroll(siteHeaderRef);
    
    function handleLogin() {
        openModal('LOGIN_VIEW');
    }
    
    function handleMobileMenu() {
        return openSidebar();
    }
    
    function handleCategoryMenu() {
        setCategoryMenu(!categoryMenu);
    }
    
    return (
        <>
            <header
                id="siteHeader"
                ref={siteHeaderRef}
                className={cn(
                    'header-three sticky-header sticky top-0 z-50 lg:relative w-full',
                    displayMobileSearch && 'active-mobile-search'
                )}
            >
                <div className="innerSticky z-20 w-full transition duration-200 ease-in-out  body-font bg-skin-one">
                    <Search
                        lang={lang}
                        searchId="mobile-search"
                        className="top-bar-search hidden lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-12 xl:top-1"
                    />
                    
                    <div className="navbar top-6  lg:block px-4 lg:px-10">
                        <Container>
                            <div className="flex justify-between items-center md:gap-8 py-4 lg:py-0">
                                <div className="relative flex-shrink-0 lg:hidden">
                                    <button
                                        aria-label="Menu"
                                        className="border border-skin-fill/40 rounded-md focus:outline-none outline-none menuBtn px-2.5 md:px-3 lg:px-[18px] py-2 md:py-2.5 lg:py-3 flex items-center"
                                        onClick={handleMobileMenu}
                                    >
                                        <FiMenu className="text-xl lg:text-2xl text-skin-inverted"/>
                                    </button>
                                </div>
                                <Logo lang={lang} className="ps-3 md:ps-0 lg:mx-0"/>
                                {/* End of logo */}
    
                                <HeaderMenu
                                    data={site_header.menu}
                                    className="hidden lg:flex transition-all duration-200 ease-in-out"
                                    lang={lang}
                                />
                                {/* End of main menu */}
    
                                {displaySearch && (
                                    <div
                                        className="sticky-search w-full absolute top-0 left-0 px-4 flex items-center justify-center h-full">
                                        <Search
                                            searchId="top-bar-search"
                                            lang={lang}
                                            className="max-w-[780px] xl:max-w-[830px] 2xl:max-w-[1000px]"
                                        />
                                    </div>
                                )}
                                {/* End of conditional search  */}
    
                                <div className="lg:ms-auto items-center flex-shrink-0">
                                    <div className="lg:flex items-center space-x-3 xl:space-x-5">
                                        <button
                                            type="button"
                                            aria-label="Search Toggle"
                                            onClick={() => openSearch()}
                                            title="Search toggle"
                                            className="outline-none w-11 h-11 flex items-center justify-center  hover:text-heading focus:outline-none"
                                        >
                                            <SearchIcon className="w-[24px] h-[24px] text-white "/>
                                        </button>
                                        {/* End of search handler btn */}
    
                                        <div className="hidden lg:flex flex-shrink-0 flex items-center">
                                          
                                            <AuthMenu
                                                isAuthorized={isAuthorized}
                                                href={`/${lang}${ROUTES.ACCOUNT}`}
                                                btnProps={{
                                                    children: <AiOutlineUser className=" text-xl lg:text-3xl"/>,
                                                    onClick: handleLogin,
                                                }}
                                            >
                                                {t('text-account')}
                                            </AuthMenu>
                                        </div>
                                        <CartButton 
                                            className="hidden lg:flex"
                                            iconClassName={'text-white'}
                                            lang={lang}
                                            hideLabel={true}
                                        />
                                    </div>
                                </div>
                                {/* End of auth & lang */}
                            </div>
                        </Container>
                    </div>
                    
                </div>
            </header>
            
        </>
    );
}

export default Header;

import {useEffect, useRef, useState} from 'react';
import dynamic from 'next/dynamic';
import {siteSettings} from '@settings/site-settings';
import {ROUTES} from '@utils/routes';
import {useUI} from '@contexts/ui.context';
import {useActiveScroll} from '@utils/use-active-scroll';
import Container from '@components/ui/container';
import Logo from '@components/ui/logo';
import UserIcon from '@components/icons/user-icon';
import {AiOutlineUser} from 'react-icons/ai';
import SearchIcon from '@components/icons/search-icon';
import HeaderMenu from '@layouts/header/header-menu';
import HeaderMenutop from '@layouts/header/header-menutop';
import LanguageSwitcher from '@components/ui/language-switcher';
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
    const [categoryMenu, setCategoryMenu] = useState(Boolean(true));
    
    //window resize event listener CategoryMenu
    useEffect(() => {
        function handleResize(): void {
            window.innerWidth > 1600 ? setCategoryMenu(true) : setCategoryMenu(false);
        }
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return (): void => window.removeEventListener('resize', handleResize);
    }, []);
    
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
                    'header-two sticky-header sticky top-0 z-50 lg:relative w-full',
                    displayMobileSearch && 'active-mobile-search'
                )}
            >
                <div className="innerSticky z-20 w-full transition duration-200 ease-in-out  body-font bg-white">
                    <Search
                        lang={lang}
                        searchId="mobile-search"
                        className="top-bar-search hidden lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-12 xl:top-1"
                    />
                    <div className="top-bar  text-13px border-b border-black/10">
                        <Container>
                            <div className="h-12 flex justify-between items-center py-2 gap-5">
                                <text className={`hidden md:block truncate`}>
                                    {t('text-store-location')}
                                </text>
                                <div className="flex flex-shrink-0 smx-auto max-w-[1920px] pace-s-5">
                                    <HeaderMenutop
                                        data={site_header.topmenu}
                                        className="flex transition-all duration-200 ease-in-out"
                                        classNameLink={"text-current"}
                                        lang={lang}
                                    />
                                    <LanguageSwitcher lang={lang}/>
                                </div>
                            </div>
                        </Container>
                    </div>
                    <div className="border-b border-white/10">
                        <Container>
                            <div className="flex items-center justify-between  py-2 md:py-6">
                                <div className="relative flex-shrink-0 lg:hidden">
                                    <button
                                        aria-label="Menu"
                                        className="border border-skin-base/40 rounded-md focus:outline-none outline-none menuBtn px-2.5 md:px-3 lg:px-[18px] py-2 md:py-2.5 lg:py-3 flex items-center"
                                        onClick={handleMobileMenu}
                                    >
                                        <FiMenu className="text-xl lg:text-2xl"/>
                                    </button>
                                </div>
                                {/* End of Category */}
                                
                                <div
                                    className={`text-14px flex gap-2 hidden lg:flex`}>
                                    <div className="image_hotline bg-iconPhone2"></div>
                                    <div className={``}>
                                        <div className="text-current">{t('text-hotline')}</div>
                                        <a className="text-sm text-current font-medium">
                                            {t('link-phone')}
                                        </a>
                                    </div>
    
                                </div>
                                {/* End of Phone */}
                                
                                <Logo lang={lang} className="ps-3 md:ps-0 lg:mx-0"/>
                                {/* End of logo */}
    
                                {displaySearch && (
                                    <div className="sticky-search w-full absolute top-0 left-0 px-4 flex items-center justify-center h-full">
                                        <Search
                                            searchId="top-bar-search"
                                            lang={lang}
                                            className="max-w-[780px] xl:max-w-[830px] 2xl:max-w-[1000px]"
                                        />
                                    </div>
                                )}
                                {/* End of conditional search  */}
                                
                                <div className="flex space-x-3 xl:space-x-10 lg:max-w-[33%]">
                                    <button
                                        type="button"
                                        aria-label="Search Toggle"
                                        onClick={() => openSearch()}
                                        title="Search toggle"
                                        className="outline-none w-11 h-11 flex items-center justify-center  hover:text-heading focus:outline-none"
                                    >
                                        <SearchIcon className="w-[24px] h-[24px] text-base "/>
                                    </button>
                                    {/* End of search handler btn */}
                                    
                                    <div className="items-center hidden lg:flex shrink-0 accountButton">
                                      
                                        <AuthMenu
                                            className={"sm:text-current"}
                                            isAuthorized={isAuthorized}
                                            href={`/${lang}${ROUTES.ACCOUNT}`}
                                            btnProps={{
                                                children: <AiOutlineUser className="text-current text-xl lg:text-3xl"/>,
                                                onClick: handleLogin,
                                            }}
                                        >
                                            {t('text-account')}
                                        </AuthMenu>
                                    </div>
                                    <CartButton hideLabel={true} className="hidden lg:flex" lang={lang} iconClassName={"text-current"}/>
                                </div>
                                {/* End of auth & lang */}
                            </div>
                        </Container>
                    </div>
                    <div className="hidden navbar bg-gray-900 lg:block  z-[1100]">
                        <Container>
                            <div className="flex justify-between items-center">
                                <Logo
                                    lang={lang}
                                    className="navbar-logo w-0 opacity-0 transition-all duration-200 ease-in-out"
                                />
                                {/* End of logo */}
                                
                                <HeaderMenu
                                    data={site_header.menu}
                                    className="flex transition-all duration-200 ease-in-out"
                                    lang={lang}
                                />
                                {/* End of main menu */}
                                {displaySearch && (
                                    <div
                                        className="sticky-search w-full absolute top-0 left-0 px-4 flex items-center justify-center h-full">
                                        <Search
                                            ref={siteSearchRef}
                                            className="max-w-[780px] xl:max-w-[830px] 2xl:max-w-[1000px]"
                                            lang={lang}
                                        />
                                    </div>
                                )}
                                {/* End of conditional search  */}
                                <div className="ms-auto flex items-center flex-shrink-0">
                                    <div
                                        className="navbar-right flex items-center overflow-hidden w-0 opacity-0 transition-all duration-200 ease-in-out">
                                        <button
                                            type="button"
                                            aria-label="Search Toggle"
                                            onClick={() => openSearch()}
                                            title="Search toggle"
                                            className="outline-none me-6 w-12 md:w-14 h-full flex items-center justify-center transition duration-200 ease-in-out hover:text-heading focus:outline-none"
                                        >
                                            <SearchIcon className="w-[22px] h-[22px] text-white "/>
                                        </button>
                                        {/* End of search handler btn */}
                                        
                                        <div className="hidden lg:flex items-center flex-shrink-0 accountButton">
                                            <AuthMenu
                                                isAuthorized={isAuthorized}
                                                href={ROUTES.ACCOUNT}
                                                btnProps={{
                                                    children: <AiOutlineUser className="text-current text-xl lg:text-3xl"/>,
                                                    onClick: handleLogin,
                                                }}
                                            >
                                                {t('text-account')}
                                            </AuthMenu>
                                        </div>
                                        {/* End of auth */}
                                        
                                        <CartButton className="ms-8 " lang={lang} iconClassName={"text-white"}/>
                                        {/* End of cart btn */}
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;

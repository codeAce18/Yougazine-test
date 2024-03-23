import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { siteSettings } from '@settings/site-settings';
import { ROUTES } from '@utils/routes';
import { useUI } from '@contexts/ui.context';
import { useActiveScroll } from '@utils/use-active-scroll';
import Container from '@components/ui/container';
import Logo from '@components/ui/logo';
import UserIcon from '@components/icons/user-icon';
import MenuIcon from '@components/icons/menu-icon';
import SearchIcon from '@components/icons/search-icon';
import HeaderMenu from '@layouts/header/header-menu';
import HeaderMenutop from '@layouts/header/header-menutop';
import LanguageSwitcher from '@components/ui/language-switcher';
import { useModalAction } from '@components/common/modal/modal.context';
import cn from 'classnames';
import Search from '@components/common/search';
import { FiMenu } from 'react-icons/fi';
import CategoryDropdownMenu from '@components/category/category-dropdown-menu';
import { useTranslation } from 'src/app/i18n/client';
import { AiOutlineFolder, AiOutlineUser } from "react-icons/ai";
import { MdCall } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { FaTimes, FaTimesCircle } from 'react-icons/fa';
import { BiCross } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import { IoCloseCircleOutline } from 'react-icons/io5';
import Link from 'next/link';

const AuthMenu = dynamic(() => import('@layouts/header/auth-menu'), {
    ssr: false,
});
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
    ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

function Header({ lang }: { lang: string }) {
    const { openSidebar, displaySearch, openSearch, isAuthorized, displayMobileSearch } = useUI();
    const { openModal } = useModalAction();
    const siteSearchRef = useRef() as DivElementRef;
    const { t } = useTranslation(lang, 'common');
    const siteHeaderRef = useRef() as DivElementRef;
    const [categoryMenu, setCategoryMenu] = useState(Boolean(false));
    useActiveScroll(siteHeaderRef);

    const pathname = usePathname().split('/').pop();
    const index = pathname == 'introduction' ? 1 : pathname == 'category' ? 2 : pathname == 'template' ? 3 : pathname == 'template-detail' ? 4 : pathname == 'selection' ? 5 : 0;

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
                    'header-four sticky-header sticky top-0 z-50 lg:relative w-full',
                    displayMobileSearch && 'active-mobile-search'
                )}
            >
                <div className="innerSticky z-20 w-full transition duration-200 ease-in-out  body-font bg-skin-one">
                    <Search
                        lang={lang}
                        searchId="mobile-search"
                        className="top-bar-search hidden lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-12 xl:top-1"
                    />
                    <div className="top-bar text-13px text-gray-300 border-b border-white/10">
                        <Container>
                            <div className="h-12 flex justify-between items-center py-2 gap-5">
                                <text className={`hidden md:block truncate`}>
                                    {t('text-free-shipping')}
                                </text>
                                <div className="flex flex-shrink-0 smx-auto max-w-[1920px]pace-s-5">
                                    <HeaderMenutop
                                        data={site_header.topmenu}
                                        className="flex transition-all duration-200 ease-in-out"
                                        lang={lang}
                                    />
                                    <LanguageSwitcher lang={lang} />
                                </div>
                            </div>
                        </Container>
                    </div>
                    <div className="border-b border-white/10">
                        <Container>
                            <div className="flex items-center justify-between  py-2 md:py-4">
                                <div className="relative flex-shrink-0 lg:hidden">
                                    <button
                                        aria-label="Menu"
                                        className="border border-skin-fill/40 rounded-md focus:outline-none outline-none menuBtn px-2.5 md:px-3 lg:px-[18px] py-2 md:py-2.5 lg:py-3 flex items-center"
                                        onClick={handleMobileMenu}
                                    >
                                        <FiMenu className="text-xl lg:text-2xl text-skin-inverted" />
                                    </button>
                                </div>
                                <Logo lang={lang} className="ps-3 md:ps-0 lg:mx-0" />
                                {/* End of logo */}
                                <Search
                                    searchId="top-bar-search"
                                    lang={lang}
                                    className="hidden lg:flex lg:max-w-[450px] xl:max-w-[650px] 2xl:max-w-[800px] lg:mx-10"
                                />
                                {/* End of search */}

                                <div className="flex space-x-5 xl:space-x-10 lg:max-w-[33%]">
                                    {
                                        isAuthorized && (
                                            <>
                                                <div className="items-center hidden lg:flex shrink-0 accountButton">
                                                    <AuthMenu
                                                        isAuthorized={isAuthorized}
                                                        href={`/${lang}${ROUTES.ACCOUNT}`}
                                                        btnProps={{
                                                            children: (
                                                                <div className="flex items-center">
                                                                    <AiOutlineUser className="text-xl lg:text-2xl text-brand-dark" />
                                                                    <span className="text-sm font-normal text-brand-secondary ltr:ml-2 rtl:mr-2">
                                                                        {t('text-login')}
                                                                    </span>
                                                                </div>
                                                            ),
                                                            onClick: handleLogin,
                                                        }}
                                                    >
                                                        <div className="flex items-center">
                                                            <AiOutlineUser className="text-xl lg:text-2xl text-brand-dark" />
                                                            <span className="text-sm font-normal text-brand-secondary ltr:ml-2 rtl:mr-2">
                                                                {t('text-account')}
                                                            </span>
                                                        </div>
                                                    </AuthMenu>
                                                </div>
                                                <div className="items-center hidden lg:flex shrink-0 accountButton">
                                                    <AuthMenu
                                                        isAuthorized={isAuthorized}
                                                        href={`/${lang}${ROUTES.PROJECT}`}
                                                        btnProps={{
                                                            children: (
                                                                <div className="flex items-center">
                                                                    <AiOutlineFolder className="text-xl lg:text-2xl text-brand-dark" />
                                                                    <span className="text-sm font-normal text-brand-secondary ltr:ml-2 rtl:mr-2">
                                                                        {t('text-project')}
                                                                    </span>
                                                                </div>
                                                            ),
                                                            onClick: handleLogin,
                                                        }}
                                                    >
                                                        <div className="flex items-center">
                                                            <AiOutlineFolder className="text-xl lg:text-2xl text-brand-dark" />
                                                            <span className="text-sm font-normal text-brand-secondary ltr:ml-2 rtl:mr-2">
                                                                {t('text-project')}
                                                            </span>
                                                        </div>
                                                    </AuthMenu>
                                                </div>
                                            </>
                                        )
                                    }

                                    <CartButton
                                        className="hidden lg:flex"
                                        iconClassName={'text-brand-dark'}
                                        lang={lang}
                                    />
                                    {
                                        !isAuthorized && (
                                            <button className="bg-fill-secondary rounded-full w-[100px] m-1 text-white" onClick={handleLogin}>Login</button>
                                        )
                                    }
                                </div>
                                {/* End of auth & lang */}
                            </div>
                        </Container>
                    </div>

                    <div className="hidden navbar lg:block bg-white  text-skin-base border-b border-black/10">
                        <Container>
                            <div className="flex justify-between items-center my-1 ">
                                {/* <Logo
                                    lang={lang}
                                    className="navbar-logo w-0 opacity-0 transition-all duration-200 ease-in-out"
                                /> */}
                                {/* End of logo */}
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

                                <div className='flex w-full'>
                                    <MdCall className='w-[40px] h-[40px] text-xl p-2 mr-3 rounded-full border border-gray-400' />
                                    <div className='flex flex-col'>
                                        <span className='text-sm font-bold'>Talk with an expert</span>
                                        <span className='text-sm text-gray-600'>+234 803 556 7890</span>
                                    </div>
                                </div>
                                {
                                    pathname !== 'checkout' && (
                                        <div className='flex w-full justify-end'>

                                            {index > 1 && (<div className='w-[20px] h-[20px] mx-1 bg-brand rounded-full text-white text-center relative'><span className='w-[20px] h-[20px] absolute -top-0.5 left-0'>&#10003;</span></div>)}
                                            {index <= 1 && (<div className='w-[20px] mx-1 h-[20px] bg-brand-secondary rounded-full text-white text-center relative'><span className='w-[20px] h-[20px] absolute -top-0.5 left-0'>1</span></div>)}
                                            {index == 1 && (<span className='mx-1 text-fill-secondary font-bold text-sm'>Introduction |</span>)}

                                            {index > 2 && (<div className='w-[20px] h-[20px] mx-1 bg-brand rounded-full text-white text-center relative'><span className='w-[20px] h-[20px] absolute -top-0.5 left-0'>&#10003;</span></div>)}
                                            {index <= 2 && (<div className='w-[20px] mx-1 h-[20px] bg-brand-secondary rounded-full text-white text-center relative'><span className='w-[20px] h-[20px] absolute -top-0.5 left-0'>2</span></div>)}
                                            {index == 2 && (<span className='mx-1 text-fill-secondary font-bold text-sm'>Category |</span>)}

                                            {index > 3 && (<div className='w-[20px] h-[20px] mx-1 bg-brand rounded-full text-white text-center relative'><span className='w-[20px] h-[20px] absolute -top-0.5 left-0'>&#10003;</span></div>)}
                                            {index <= 3 && (<div className='w-[20px] mx-1 h-[20px] bg-brand-secondary rounded-full text-white text-center relative'><span className='w-[20px] h-[20px] absolute -top-0.5 left-0'>3</span></div>)}
                                            {index == 3 && (<span className='mx-1 text-fill-secondary font-bold text-sm'>Template |</span>)}

                                            {index > 4 && (<div className='w-[20px] h-[20px] mx-1 bg-brand rounded-full text-white text-center relative'><span className='w-[20px] h-[20px] absolute -top-0.5 left-0'>&#10003;</span></div>)}
                                            {index <= 4 && (<div className='w-[20px] mx-1 h-[20px] bg-brand-secondary rounded-full text-white text-center relative'><span className='w-[20px] h-[20px] absolute -top-0.5 left-0'>4</span></div>)}
                                            {index == 4 && (<span className='mx-1 text-fill-secondary font-bold text-sm'>Template |</span>)}

                                            {index > 5 && (<div className='w-[20px] h-[20px] mx-1 bg-brand rounded-full text-white text-center relative'><span className='w-[20px] h-[20px] absolute -top-0.5 left-0'>&#10003;</span></div>)}
                                            {index <= 5 && (<div className='w-[20px] mx-1 h-[20px] bg-brand-secondary rounded-full text-white text-center relative'><span className='w-[20px] h-[20px] absolute -top-0.5 left-0'>5</span></div>)}
                                            {index == 5 && (<span className='mx-1 text-fill-secondary font-bold text-sm'>Selection |</span>)}
                                        </div>
                                    )
                                }
                                {pathname == 'checkout' && (<Link href={'/en'} className='flex text-brand-secondary'><IoCloseCircleOutline className='w-[20px] h-[20px] mt-0.5' />&nbsp;&nbsp;Cancel</Link>)}

                                
                                {/* End of main menu */}

                            </div>
                        </Container>
                    </div>
                </div>
            </header>
            {categoryMenu && (
                <div
                    className="shadow_bkg_show fixed w-full h-full inset-0 bg-black/60 z-40"
                    onClick={handleCategoryMenu}
                ></div>
            )}
        </>
    );
}

export default Header;
import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
   components: {
            Layout: {
                triggerColor:'rgb(14 165 233)',
                bodyBg:'#365314',
                headerPadding:'0 10px',
                footerBg:'#047857',
                siderBg:'#134405',
            },
            Divider: {
                colorSplit: '#69b1ff'
            },Menu: {
                darkItemBg: '#14532d',
                darkItemColor: '#ffffff',
                iconSize:25,
                itemMarginBlock:30,
                darkItemSelectedBg: '#021631',
                darkSubMenuItemBg: '#010e54',
                darkItemHoverBg	: '#022c22',
                darkItemHoverColor	: '#ffffff',
            },Card : {
                actionsBg: 'rgba(143,141,141,0.6)',
                padding: 0,
                paddingLG: 0,
             }
        }
};

export default theme;
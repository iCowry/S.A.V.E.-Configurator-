import { CategoryData, CategoryId, LocalizedString } from './types';

export const UI_STRINGS = {
  headerSubtitle: { en: "Modular System Configurator", zh: "模块化空间配置器" },
  yourSpace: { en: "Your Space", zh: "您的空间" },
  visualization: { en: "Visualization of your S.A.V.E. setup", zh: "S.A.V.E. 配置实时预览" },
  installedModules: { en: "Installed Modules", zh: "已安装模块" },
  noAccessories: { en: "No accessories added", zh: "未添加配件" },
  noLight: { en: "No Light", zh: "无灯光" },
  noTerminal: { en: "No Terminal", zh: "无终端" },
  noDesk: { en: "No Desk", zh: "无基座" },
  selectMulti: { en: "Select one or more options to enhance your setup.", zh: "选择一个或多个选项来增强您的体验。" },
  selectSingle: { en: "Choose the core module that fits your needs.", zh: "选择最适合您需求的核心模块。" },
  configuration: { en: "Configuration", zh: "配置清单" },
  totalEstimate: { en: "Total Estimate", zh: "预估总价" },
  buyNow: { en: "Buy Now", zh: "立即购买" },
  proceedToCheckout: { en: "Proceeding to checkout with: ", zh: "正在结算： " },
  
  // Checkout Modal Strings
  checkoutTitle: { en: "Order Summary", zh: "配置清单确认" },
  checkoutDesc: { en: "Review your custom configuration before purchasing.", zh: "请在下单前确认您的定制配置。" },
  itemLabel: { en: "Item", zh: "商品名称" },
  categoryLabel: { en: "Category", zh: "类别" },
  priceLabel: { en: "Price", zh: "价格" },
  totalLabel: { en: "Total", zh: "总计" },
  cancel: { en: "Cancel", zh: "取消" },
  confirmOrder: { en: "Confirm Order", zh: "确认下单" },
  orderSuccess: { en: "Order Placed Successfully!", zh: "下单成功！" }
};

export const PRODUCTS: CategoryData[] = [
  {
    id: CategoryId.DESK,
    title: { en: "Smart Desk", zh: "智能基座" },
    multiSelect: false,
    items: [
      { 
        id: 'D1', 
        name: { en: "Mechanical Base", zh: "机械基座" }, 
        price: 699, 
        description: { en: "Hand-crank, ENF wood, Basic", zh: "手摇升降，ENF级环保板材，基础款" }, 
        categoryId: CategoryId.DESK 
      },
      { 
        id: 'D2', 
        name: { en: "Smart Control", zh: "智控基座" }, 
        price: 999, 
        description: { en: "Single Motor, App Control, Standard", zh: "单电机，App智控，标准款" }, 
        categoryId: CategoryId.DESK, 
        badge: { en: "Best Seller", zh: "热销" } 
      },
      { 
        id: 'D3', 
        name: { en: "Power Core", zh: "强核基座" }, 
        price: 1599, 
        description: { en: "Dual Motor, X-Link Power, Flagship", zh: "双电机，X-Link强电，旗舰款" }, 
        categoryId: CategoryId.DESK 
      },
    ]
  },
  {
    id: CategoryId.LIGHT,
    title: { en: "Adaptive Light", zh: "自适应光" },
    multiSelect: false,
    items: [
      { 
        id: 'L1', 
        name: { en: "Basic Light", zh: "基础光" }, 
        price: 199, 
        description: { en: "Ra95, Touch control", zh: "显色指数Ra95，触控调节" }, 
        categoryId: CategoryId.LIGHT 
      },
      { 
        id: 'L2', 
        name: { en: "AI Light", zh: "AI光" }, 
        price: 399, 
        description: { en: "Auto-dimming, Presence sensor", zh: "自动调光，入座感应" }, 
        categoryId: CategoryId.LIGHT, 
        badge: { en: "Recommended", zh: "店长推荐" } 
      },
      { 
        id: 'L3', 
        name: { en: "Rhythm Light", zh: "节律光" }, 
        price: 799, 
        description: { en: "Dynamic Spectrum, RG0, Wide wing", zh: "动态光谱，RG0豁免级，超宽翼" }, 
        categoryId: CategoryId.LIGHT 
      },
    ]
  },
  {
    id: CategoryId.TERMINAL,
    title: { en: "Learning Terminal", zh: "学习终端" },
    multiSelect: false,
    items: [
      { 
        id: 'T1', 
        name: { en: "Dash", zh: "伴学灵" }, 
        price: 599, 
        description: { en: "5.5-inch Screen, OCR, Clock", zh: "5.5英寸屏，指尖查词，时钟" }, 
        categoryId: CategoryId.TERMINAL 
      },
      { 
        id: 'T2', 
        name: { en: "Essential", zh: "启明屏" }, 
        price: 1499, 
        description: { en: "12.7-inch 2K Screen, RK3566", zh: "12.7英寸2K屏，RK3566芯片" }, 
        categoryId: CategoryId.TERMINAL 
      },
      { 
        id: 'T3', 
        name: { en: "Focus", zh: "专注屏" }, 
        price: 2699, 
        description: { en: "16-inch 2.5K Screen, RK3588S", zh: "16英寸2.5K屏，RK3588S强芯" }, 
        categoryId: CategoryId.TERMINAL, 
        badge: { en: "Pro Choice", zh: "专业之选" } 
      },
      { 
        id: 'T4', 
        name: { en: "Pro", zh: "领航屏" }, 
        price: 3999, 
        description: { en: "18-inch 3:2 Screen, Local AI", zh: "18英寸3:2屏，本地大模型" }, 
        categoryId: CategoryId.TERMINAL 
      },
      { 
        id: 'T5', 
        name: { en: "Ultra", zh: "未来屏" }, 
        price: 4999, 
        description: { en: "E-ink or Dual Screen, Custom", zh: "墨水屏/双屏可选，定制款" }, 
        categoryId: CategoryId.TERMINAL 
      },
      { 
        id: 'T6', 
        name: { en: "Galaxy Bridge", zh: "星际舰桥" }, 
        price: 8999, 
        description: { en: "Triple 4K Matrix, 144Hz, Immersive", zh: "三联4K矩阵屏，144Hz，沉浸式座舱" }, 
        categoryId: CategoryId.TERMINAL,
        badge: { en: "Cockpit Mode", zh: "驾驶舱模式" }
      },
    ]
  },
  {
    id: CategoryId.ACCESSORIES,
    title: { en: "Expansion Pack", zh: "扩展包" },
    multiSelect: true,
    items: [
      { 
        id: 'A1', 
        name: { en: "AI Microscope", zh: "AI显微镜" }, 
        price: 299, 
        description: { en: "1000x Zoom, Wireless", zh: "1000倍放大，无线连接" }, 
        categoryId: CategoryId.ACCESSORIES 
      },
      { 
        id: 'A2', 
        name: { en: "Focus Button", zh: "专注按键" }, 
        price: 99, 
        description: { en: "One-press Pomodoro", zh: "一键番茄钟" }, 
        categoryId: CategoryId.ACCESSORIES 
      },
      { 
        id: 'A3', 
        name: { en: "Magnetic Skin", zh: "磁吸桌贴" }, 
        price: 199, 
        description: { en: "Customizable Desk Cover", zh: "个性化桌垫，随心换" }, 
        categoryId: CategoryId.ACCESSORIES 
      },
      { 
        id: 'A4', 
        name: { en: "Smart Watch", zh: "智能手表" }, 
        price: 899, 
        description: { en: "Health tracking, SOS", zh: "健康监测，一键呼救" }, 
        categoryId: CategoryId.ACCESSORIES,
        badge: { en: "New", zh: "新品" }
      },
      { 
        id: 'A5', 
        name: { en: "AR Glasses", zh: "AR眼镜" }, 
        price: 2499, 
        description: { en: "Immersive learning, HUD", zh: "沉浸式学习，抬头显示" }, 
        categoryId: CategoryId.ACCESSORIES 
      },
      { 
        id: 'A6', 
        name: { en: "AI Keyboard", zh: "AI键盘" }, 
        price: 499, 
        description: { en: "Voice typing, Shortcuts", zh: "语音输入，快捷键定制" }, 
        categoryId: CategoryId.ACCESSORIES 
      },
      { 
        id: 'A7', 
        name: { en: "Creative Pad", zh: "AI手绘板" }, 
        price: 799, 
        description: { en: "Pressure sensitive, Wireless", zh: "8192级压感，无线连接" }, 
        categoryId: CategoryId.ACCESSORIES 
      },
      { 
        id: 'A8', 
        name: { en: "Posture Elf", zh: "坐姿精灵" }, 
        price: 159, 
        description: { en: "Real-time alert, Spinal care", zh: "实时提醒，脊柱呵护" }, 
        categoryId: CategoryId.ACCESSORIES 
      },
      { 
        id: 'A9', 
        name: { en: "Ambient Speaker", zh: "氛围音箱" }, 
        price: 399, 
        description: { en: "White noise, Bluetooth", zh: "白噪音，蓝牙连接" }, 
        categoryId: CategoryId.ACCESSORIES 
      },
      { 
        id: 'A10', 
        name: { en: "Pro Headset", zh: "专业耳麦" }, 
        price: 599, 
        description: { en: "Noise cancelling, 7.1 Surround", zh: "主动降噪，7.1环绕声" }, 
        categoryId: CategoryId.ACCESSORIES 
      },
      { 
        id: 'A11', 
        name: { en: "Control Stick", zh: "操控摇杆" }, 
        price: 399, 
        description: { en: "Hall sensor, Programmable", zh: "霍尔传感器，可编程" }, 
        categoryId: CategoryId.ACCESSORIES 
      },
      { 
        id: 'A12', 
        name: { en: "Racing Wheel", zh: "驾驶方向盘" }, 
        price: 1299, 
        description: { en: "Force feedback, Pedals included", zh: "力反馈，含踏板" }, 
        categoryId: CategoryId.ACCESSORIES 
      },
      { 
        id: 'A13', 
        name: { en: "Smart Band", zh: "智能手环" }, 
        price: 249, 
        description: { en: "Basic fitness/sleep tracking, Todo list", zh: "性价比之选，运动睡眠监测，待办备忘" }, 
        categoryId: CategoryId.ACCESSORIES 
      }
    ]
  }
];

export const INITIAL_STATE = {
  desk: 'D2',
  light: 'L2',
  terminal: 'T2',
  accessories: [] as string[]
};
import path from './path';
import icons from './icons';

export const navigation = [
    {
        id: 1,
        value: 'TRANG CHỦ',
        path: `/${path.HOME}`
    },
    {
        id: 2,
        value: 'SẢN PHẨM',
        path: `/${path.PRODUCTS}`
    },
    {
        id: 3,
        value: 'BÀI VIẾT',
        path: `/${path.BLOGS}`
    },
    {
        id: 4,
        value: 'VỀ CHÚNG TÔI',
        path: `/${path.OUR_SERVICES}`
    },
    {
        id: 5,
        value: 'CÂU HỎI THƯỜNG GẶP',
        path: `/${path.FAQ}`
    },
]

const {  
    BsShieldShaded,
    RiTruckFill,
    AiFillGift,
    BsReplyFill,
    FaTty} = icons
export const productExtraInforItem = [
    {
        id: 1,
        title: 'Bảo Đảm',
        sub: 'Đã Kiểm Tra Chất Lượng',
        icons: <BsShieldShaded/>
    },
    {
        id: 2,
        title: 'Miễn Phí Vận Chuyển',
        sub: 'Miễn Phí Trên Tất Cả Các Sản Phẩm',
        icons: <RiTruckFill/>
    },
    {
        id: 3,
        title: 'Thẻ Quà Tặng Đặc Biệt',
        sub: 'Thẻ Quà Tặng Đặc Biệt',
        icons: <AiFillGift/>
    },
    {
        id: 4,
        title: 'Trả Hàng Miễn Phí',
        sub: 'Trong Vòng 7 Ngày',
        icons: <BsReplyFill/>
    },
    {
        id: 5,
        title: 'Tư Vấn',
        sub: '24/7/356',
        icons: <FaTty/>
    },
]

export const productInforTabs = [
    {
        id:1,
        name: 'MIÊU TẢ',
        content: 
        `
        Công nghệ: GSM/HSPA/LTE
        Kích thước: 144,6 x 69,2 x 7,3 mm
        Trọng lượng: 129g
        Màn hình: IPS LCD 5.15 inch
        Độ phân giải: 1080 x 1920
        Hệ điều hành: Hệ điều hành Android, v6.0 (Marshmallow)
        Bộ vi xử lý: Snapdragon 820
        CPU: Lõi tứ
        Bộ nhớ trong: 32GB/64GB/128GB
        Máy ảnh: 16 MP, f/2.0 - 4 MP, f/2.0
        `
    },
    {
        id:2,
        name: 'BẢO HÀNH',
        content: `
        THÔNG TIN BẢO HÀNH
        BẢO HÀNH CÓ
        GIỚI HẠN Bảo hành có giới hạn không được chuyển nhượng. Các Bảo hành có giới hạn sau đây được trao cho người mua lẻ ban đầu của các Sản phẩm của Ashley Furniture Industries, Inc. sau đây:

        Khung được sử dụng trong các sản phẩm bọc và da
        Bảo hành trọn đời có giới hạn
        Bảo hành trọn đời có giới hạn áp dụng cho tất cả các khung được sử dụng trong ghế sofa, trường kỷ, ghế tình yêu, ghế bọc, ghế dài có giường, ghế ghép và giường ngủ. Ashley Furniture Industries, Inc. đảm bảo các thành phần này cho bạn, người mua lẻ ban đầu, không có lỗi sản xuất vật liệu.
        `
    },
    {
        id:3,
        name: 'VẬN CHUYỂN',
        content: `
        MUA & GIAO HÀNG
        Trước khi bạn mua hàng, thật hữu ích khi biết các phép đo của khu vực bạn định đặt đồ nội thất. Bạn cũng nên đo bất kỳ ô cửa và hành lang nào mà đồ nội thất sẽ đi qua để đến đích cuối cùng.
        Nhận tại cửa hàng
        Shopify Shop yêu cầu tất cả các sản phẩm phải được kiểm tra kỹ lưỡng TRƯỚC KHI bạn mang về nhà để đảm bảo không có bất ngờ nào xảy ra. Nhóm của chúng tôi sẵn lòng mở tất cả các gói hàng và sẽ hỗ trợ trong quá trình kiểm tra. Sau đó chúng tôi sẽ niêm phong lại các kiện hàng để vận chuyển an toàn. Chúng tôi khuyến khích tất cả khách hàng mang theo miếng đệm hoặc chăn để bảo vệ đồ đạc trong quá trình vận chuyển cũng như dây thừng hoặc dây buộc. Shopify Shop sẽ không chịu trách nhiệm đối với hư hỏng xảy ra sau khi rời khỏi cửa hàng hoặc trong quá trình vận chuyển. Người mua có trách nhiệm đảm bảo rằng các mặt hàng chính xác được chọn và ở trong tình trạng tốt.
        Vận chuyển
        `
    },
    {
        id:4,
        name: 'THANH TOÁN',
        content: `
        MUA & GIAO HÀNG
        Trước khi bạn mua hàng, thật hữu ích khi biết các phép đo của khu vực bạn định đặt đồ nội thất. Bạn cũng nên đo bất kỳ ô cửa và hành lang nào mà đồ nội thất sẽ đi qua để đến đích cuối cùng.
        Nhận tại cửa hàng
        Shopify Shop yêu cầu tất cả các sản phẩm phải được kiểm tra kỹ lưỡng TRƯỚC KHI bạn mang về nhà để đảm bảo không có bất ngờ nào xảy ra. Nhóm của chúng tôi sẵn lòng mở tất cả các gói hàng và sẽ hỗ trợ trong quá trình kiểm tra. Sau đó chúng tôi sẽ niêm phong lại các kiện hàng để vận chuyển an toàn. Chúng tôi khuyến khích tất cả khách hàng mang theo miếng đệm hoặc chăn để bảo vệ đồ đạc trong quá trình vận chuyển cũng như dây thừng hoặc dây buộc. Shopify Shop sẽ không chịu trách nhiệm đối với hư hỏng xảy ra sau khi rời khỏi cửa hàng hoặc trong quá trình vận chuyển. Người mua có trách nhiệm đảm bảo rằng các mặt hàng chính xác được chọn và ở trong tình trạng tốt.
        `
    },
]

export const color = [
    'black',
    'yellow',
    'red',
    'pink',
    'blue',
    'gray',
    'white',
    'brown',
]


export const sorts = [
    {
        id:1,
        value: '-sold',
        text: 'Bán chạy nhất',
    },
    {
        id:2,
        value: 'title',
        text: 'Từ A - Z',
    },
    {
        id:3,
        value: '-title',
        text: 'Từ Z - A',
    },
    {
        id:4,
        value: '-price',
        text: 'Giá từ cao tới thấp',
    },
    {
        id:5,
        value: 'price',
        text: 'Giá từ thấp tới cao',
    },
    {
        id:6,
        value: '-createdAt',
        text: 'Mới nhất',
    },
    {
        id:7,
        value: 'createdAt',
        text: 'Cũ nhất',
    },
]

export const voteOptions = [ 
    {
        id:1,
        text: 'Cực tệ'
    },
    {
        id:2,
        text: 'Tệ'
    },
    {
        id:3,
        text: 'Bình thường'
    },
    {
        id:4,
        text: 'Tốt'
    },
    {
        id:5,
        text: 'Tuyệt vời'
    },
   
]

const {MdOutlineManageAccounts, MdGroups2, MdProductionQuantityLimits, RiBillLine} = icons
export const adminSidebar = [
    {
        id:1,
        type: 'SINGLE',
        text:'Quản lý chung',
        path:`/${path.ADMIN}/${path.DASHBOARD}`,
        icon: <MdOutlineManageAccounts size={20}/>
    },
    {
        id:2,
        type: 'SINGLE',
        text:'Quản lý người dùng',
        path:`/${path.ADMIN}/${path.MANAGE_USER}`,
        icon: <MdGroups2 size={20}/>
    },
    {
        id:3,
        type: 'PARENT',
        text:'Quản lý sản phẩm',
        icon: <MdProductionQuantityLimits size={20}/>,
        submenu: [
            {
                text: 'Thêm sản sản phẩm',
                path:`/${path.ADMIN}/${path.CREATE_PRODUCTS}`,
            },
            {
                text: 'Kho sản phẩm',
                path:`/${path.ADMIN}/${path.MANAGE_PRODUCTS}`,
            }
        ]
    },
    {
        id:4,
        type: 'SINGLE',
        text:'Quản lý đơn hàng',
        path:`/${path.ADMIN}/${path.MANAGE_ORDER}`,
        icon: <RiBillLine size={20}/>
    },
]
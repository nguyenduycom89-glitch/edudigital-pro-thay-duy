
import React from 'react';

export interface DigitalCompetencyIndicator {
  id: string;
  code: string;
  name: string;
  description: string;
  level: 'CB1' | 'CB2'; // CB1: Lớp 1-3, CB2: Lớp 4-5
  domain: string;
}

export const DIGITAL_COMPETENCIES_DATA: DigitalCompetencyIndicator[] = [
  // LĨNH VỰC 1: KHAI THÁC DỮ LIỆU VÀ THÔNG TIN
  { id: '1.1.CB1a', code: '1.1.CB1a', domain: '1. Khai thác dữ liệu & Thông tin', level: 'CB1', name: 'Xác định nhu cầu tìm kiếm đơn giản', description: 'Xác định nhu cầu thông tin, tìm kiếm dữ liệu qua tìm kiếm đơn giản.' },
  { id: '1.1.CB1b', code: '1.1.CB1b', domain: '1. Khai thác dữ liệu & Thông tin', level: 'CB1', name: 'Truy cập và điều hướng dữ liệu', description: 'Tìm cách truy cập và điều hướng giữa các dữ liệu, nội dung số.' },
  { id: '1.1.CB2a', code: '1.1.CB2a', domain: '1. Khai thác dữ liệu & Thông tin', level: 'CB2', name: 'Xác định nhu cầu thông tin cụ thể', description: 'Xác định rõ nhu cầu thông tin cho nhiệm vụ học tập.' },
  { id: '1.1.CB2c', code: '1.1.CB2c', domain: '1. Khai thác dữ liệu & Thông tin', level: 'CB2', name: 'Điều hướng nội dung phức hợp', description: 'Tìm cách truy cập, điều hướng giữa các nguồn dữ liệu khác nhau.' },
  { id: '1.2.CB1a', code: '1.2.CB1a', domain: '1. Khai thác dữ liệu & Thông tin', level: 'CB1', name: 'Phát hiện độ tin cậy nguồn tin', description: 'Phát hiện độ tin cậy và chính xác của các nguồn chung.' },
  { id: '1.2.CB2a', code: '1.2.CB2a', domain: '1. Khai thác dữ liệu & Thông tin', level: 'CB2', name: 'Đánh giá phản biện nguồn tin', description: 'Phát hiện độ tin cậy và chính xác của các nguồn dữ liệu số.' },
  { id: '1.3.CB1a', code: '1.3.CB1a', domain: '1. Khai thác dữ liệu & Thông tin', level: 'CB1', name: 'Tổ chức, lưu trữ đơn giản', description: 'Xác định cách tổ chức, lưu trữ dữ liệu đơn giản.' },
  { id: '1.3.CB2a', code: '1.3.CB2a', domain: '1. Khai thác dữ liệu & Thông tin', level: 'CB2', name: 'Quản lý dữ liệu có cấu trúc', description: 'Tổ chức, lưu trữ và sắp xếp dữ liệu trong môi trường có cấu trúc.' },

  // LĨNH VỰC 2: GIAO TIẾP VÀ HỢP TÁC
  { id: '2.1.CB1a', code: '2.1.CB1a', domain: '2. Giao tiếp và Hợp tác', level: 'CB1', name: 'Tương tác qua công nghệ số', description: 'Lựa chọn các công nghệ số đơn giản để tương tác.' },
  { id: '2.1.CB2a', code: '2.1.CB2a', domain: '2. Giao tiếp và Hợp tác', level: 'CB2', name: 'Lựa chọn phương tiện giao tiếp', description: 'Lựa chọn công nghệ số phù hợp với bối cảnh cụ thể.' },
  { id: '2.2.CB1a', code: '2.2.CB1a', domain: '2. Giao tiếp và Hợp tác', level: 'CB1', name: 'Chia sẻ dữ liệu kỹ thuật số', description: 'Nhận biết công nghệ phù hợp để chia sẻ dữ liệu đơn giản.' },
  { id: '2.2.CB2b', code: '2.2.CB2b', domain: '2. Giao tiếp và Hợp tác', level: 'CB2', name: 'Trích dẫn và ghi nguồn cơ bản', description: 'Xác định phương pháp trích dẫn và ghi nguồn dữ liệu cơ bản.' },
  { id: '2.3.CB1a', code: '2.3.CB1a', domain: '2. Giao tiếp và Hợp tác', level: 'CB1', name: 'Tham gia dịch vụ công số', description: 'Xác định các dịch vụ số đơn giản để tham gia vào xã hội.' },
  { id: '2.4.CB1a', code: '2.4.CB1a', domain: '2. Giao tiếp và Hợp tác', level: 'CB1', name: 'Cộng tác qua công cụ số', description: 'Chọn công cụ và công nghệ số đơn giản cho quá trình cộng tác.' },
  { id: '2.5.CB1a', code: '2.5.CB1a', domain: '2. Giao tiếp và Hợp tác', level: 'CB1', name: 'Quy tắc ứng xử trên mạng', description: 'Phân biệt chuẩn mực hành vi đơn giản trong môi trường số.' },
  { id: '2.6.CB1b', code: '2.6.CB1b', domain: '2. Giao tiếp và Hợp tác', level: 'CB1', name: 'Bảo vệ danh tiếng trực tuyến', description: 'Mô tả các cách đơn giản để bảo vệ danh tiếng trực tuyến.' },

  // LĨNH VỰC 3: SÁNG TẠO NỘI DUNG SỐ
  { id: '3.1.CB1a', code: '3.1.CB1a', domain: '3. Sáng tạo nội dung số', level: 'CB1', name: 'Tạo và chỉnh sửa nội dung', description: 'Xác định cách tạo và chỉnh sửa nội dung ở các định dạng đơn giản.' },
  { id: '3.2.CB1a', code: '3.2.CB1a', domain: '3. Sáng tạo nội dung số', level: 'CB1', name: 'Tích hợp và tạo lập lại', description: 'Sửa đổi, tinh chỉnh để tạo ra nội dung số mới và độc đáo.' },
  { id: '3.3.CB1a', code: '3.3.CB1a', domain: '3. Sáng tạo nội dung số', level: 'CB1', name: 'Bản quyền và giấy phép', description: 'Xác định các quy tắc đơn giản về bản quyền.' },
  { id: '3.4.CB1a', code: '3.4.CB1a', domain: '3. Sáng tạo nội dung số', level: 'CB1', name: 'Lập trình/Thuật toán cơ bản', description: 'Liệt kê các hướng dẫn đơn giản để hệ thống giải quyết vấn đề.' },

  // LĨNH VỰC 4: AN TOÀN
  { id: '4.1.CB1a', code: '4.1.CB1a', domain: '4. An toàn kỹ thuật số', level: 'CB1', name: 'Bảo vệ thiết bị số', description: 'Nhận biết cách bảo vệ thiết bị và nội dung số đơn giản.' },
  { id: '4.2.CB1a', code: '4.2.CB1a', domain: '4. An toàn kỹ thuật số', level: 'CB1', name: 'Bảo vệ dữ liệu cá nhân', description: 'Lựa chọn cách thức đơn giản để bảo vệ quyền riêng tư.' },
  { id: '4.3.CB1a', code: '4.3.CB1a', domain: '4. An toàn kỹ thuật số', level: 'CB1', name: 'Bảo vệ sức khỏe thể chất/tâm thần', description: 'Tránh rủi ro sức khỏe khi sử dụng công nghệ số.' },
  { id: '4.4.CB1a', code: '4.4.CB1a', domain: '4. An toàn kỹ thuật số', level: 'CB1', name: 'Bảo vệ môi trường', description: 'Nhận biết tác động của công nghệ số đối với môi trường.' },

  // LĨNH VỰC 5: GIẢI QUYẾT VẤN ĐỀ
  { id: '5.1.CB1a', code: '5.1.CB1a', domain: '5. Giải quyết vấn đề', level: 'CB1', name: 'Giải quyết vấn đề kỹ thuật', description: 'Xác định vấn đề kỹ thuật đơn giản khi vận hành thiết bị.' },
  { id: '5.2.CB1a', code: '5.2.CB1a', domain: '5. Giải quyết vấn đề', level: 'CB1', name: 'Xác định nhu cầu công nghệ', description: 'Xác định nhu cầu cá nhân và giải pháp công nghệ tương ứng.' },
  { id: '5.3.CB1a', code: '5.3.CB1a', domain: '5. Giải quyết vấn đề', level: 'CB1', name: 'Sáng tạo bằng công cụ số', description: 'Sử dụng công cụ số để tạo ra kiến thức mới.' },

  // LĨNH VỰC 6: ỨNG DỤNG TRÍ TUỆ NHÂN TẠO (AI)
  { id: '6.1.CB2a', code: '6.1.CB2a', domain: '6. Ứng dụng trí tuệ nhân tạo', level: 'CB2', name: 'Hiểu biết về khái niệm AI', description: 'Xác định các khái niệm cơ bản của AI.' },
  { id: '6.2.CB1a', code: '6.2.CB1a', domain: '6. Ứng dụng trí tuệ nhân tạo', level: 'CB1', name: 'Sử dụng công cụ AI đơn giản', description: 'Nhận diện và thao tác cơ bản với các công cụ AI.' },
  { id: '6.3.CB2a', code: '6.3.CB2a', domain: '6. Ứng dụng trí tuệ nhân tạo', level: 'CB2', name: 'Đánh giá hệ thống AI', description: 'Nhận diện các yếu tố cơ bản cần đánh giá trong hệ thống AI.' },
];

export const ICONS = {
  Home: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  Plus: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  ),
  Library: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
  ),
  Download: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
  ),
  Book: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
  ),
  Sparkles: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
  ),
  ChevronRight: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="9 18 15 12 9 6"/></svg>
  ),
  Trash: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
  ),
  FileWord: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M9 12h1"/><path d="M14 12h1"/><path d="M11 14h2"/><path d="M9 16h6"/></svg>
  ),
  FileText: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="10" y1="9" x2="14" y2="9"/></svg>
  )
};

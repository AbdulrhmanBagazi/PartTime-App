import { TranslationMessages } from 'react-admin'
import arabicMessages from './arabic'

const customArabicMessages: TranslationMessages = {
  ...arabicMessages,
  Users: 'المستخدمين',
  Companies: 'الشركات',
  Events: 'الفعاليات',
  Location: 'المواقع',
  app_section: 'آقسام التطبيق',
  evenjob: 'وظائف الفعاليات',
  eventshift: 'ورديات الفعاليات',
  'User Get': 'المستخدم',
  Dashboard: 'لوحة الإحصائيات',
  Dashboarddata: 'الإحصائيات',
  error: 'حدث خطآ!',
  'Email exists': 'البريد الإلكتروني مستخدم',
  create_job: 'إنشاء وظيفة',
  create_shift: 'إنشاء وردية',
  show_event: 'عرض الفعالية',
  eventId: 'الفعالية',
  Event: 'الفعالية',
  show: 'عرض',
  PENDING: 'قيد الإنتظار',
  APPROVED: 'معتمد',
  DECLINED: 'مرفوض',
  CANCELED: 'ملغي',
  COMPLETED: 'مكتمل',
  WAITLIST: 'قائمة الإنتظار',
  INTERVIEW: 'قائمة المقابلة الشخصية',
  INACTIVE: 'غير نشط',
  applicants: 'طلبات العمل',
  eventday: 'سجلات التحضير',
  create_eventday: 'إنشاء آيام',
  dashboard: {
    total_users: 'المستخدمين',
  },
  login: {
    required: 'تسجيل الدخول مطلوب!',
    invalid: 'البريد الإلكتروني أو كلمة السر خاطئة',
    sign_in: 'تسجيل الدخول',
    password: 'كلمة المرور',
    email: 'البريد الإلكتروني',
  },
  configuration: {
    configuration: 'الإعدادات',
    theme: 'المظهر',
    language: 'اللغة',
  },
  filters: {
    all: 'الجميع',
    users_filters: {
      email: 'البريد الإلكتروني',
    },
  },
  resources: {
    User: {
      name: 'المستخدمين |||| المستخدم',
      showtabs: {
        show: 'التفاصيل',
        posts: 'المنشورات',
        edit: 'تعديل',
        profile: 'الملف الشخصي',
      },
      edittabs: {
        ban: 'حظر',
      },
      fields: {
        id: 'معرف',
        name: 'الإسم',
        email: 'البريد الإلكتروني',
        verfied: 'تم التحقق',
        suspended: 'حظر',
        createdAt: 'تاريخ الإنشاء',
        // postsCount: 'المنشورات',
        Type: 'الحساب',
        Profile: {
          firstName: 'الإسم الآول',
          lastName: 'الإسم الآخير',
          nationality: 'الجنسية',
          nationalID: 'رقم الهوية',
          dateOfBirth: 'تاريخ الميلاد',
          age: 'العمر',
          createdAt: 'تاريخ الإنشاء',
          gender: 'الجنس',
          null: 'لم يتم إضافة بيانات الملف الشخصي من قبل المستخدم',
          whatsapp: 'واتس اب',
          phone: 'رقم التواصل',
        },
      },
    },
    Companies: {
      name: 'الشركات |||| الشركة',
      showtabs: {
        show: 'التفاصيل',
        Events: 'الفعاليات',
        edit: 'تعديل',
      },
      edittabs: {
        ban: 'حظر',
      },
      Events: {
        id: 'معرف',
        published: 'النشر',
        createdAt: 'تاريخ الإنشاء',
        updatedAt: 'تاريخ التحديث',
        companyId: 'معرف الشركة',
        title: 'العنوان',
        content: 'المحتوى',
        title_en: 'العنوان (إنجليزي)',
        content_en: 'المحتوى (إنجليزي)',
        location_title: 'الموقع',
        image_url: 'رابط الصورة',
        location_url: 'رابط الموقع',
        status: 'الحالة',
      },
      create: {
        name: 'الإسم',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        contact: 'رقم التواصل',
      },
      fields: {
        id: 'معرف',
        name: 'الإسم',
        email: 'البريد الإلكتروني',
        createdAt: 'تاريخ الإنشاء',
        suspended: 'حظر',
        logo_url: 'الشعار',
        contact: 'رقم التواصل',
      },
    },
    Event: {
      name: 'الفعاليات |||| الفعالية',
      showtabs: {
        details: 'تفاصيل الفعالية',
        details_en: 'تفاصيل الفعالية (إنجليزي)',
        show: 'المعلومات',
        posts: 'المنشورات',
        edit: 'تعديل',
        company: 'الشركة',
        eventjob: 'الوظائف',
        eventshift: 'الورديات',
        eventdays: 'سجلات التحضير',
      },
      edittabs: {
        editinfo: 'تعديل المعلومات',
        editdetails: 'تعديل التفاصيل',
        editdetails_en: 'تعديل التفاصيل (إنجليزي)',
        editdays: 'تعديل آيام الفعالية',
      },
      fields: {
        id: 'معرف',
        published: 'النشر',
        createdAt: 'تاريخ الإنشاء',
        updatedAt: 'تاريخ التحديث',
        companyId: 'معرف الشركة',
        title: 'العنوان',
        content: 'المحتوى',
        title_en: 'العنوان (إنجليزي)',
        content_en: 'المحتوى (إنجليزي)',
        location_title: 'الموقع',
        image_url: 'رابط الصورة',
        location_url: 'رابط الموقع',
        status: 'الحالة',
        SelectCompany: 'قم بإختيار الشركة',
        locationId: 'معرف الموقع',
        location: 'الموقع',
        app_sectionId: 'القسم في التطبيق',
        details: 'تفاصيل الفعالية',
        details_en: 'تفاصيل الفعالية (إنجليزي)',
        eventcalendar: 'آيام الفعالية',
        detailstitle: 'العنوان',
        detailscontent: 'المحتوى',
        company: {
          name: 'الشركة',
        },
      },
      status: {
        soon: 'قريبا',
        active: 'نشط',
        completed: 'مكتمل',
      },
    },
    Location: {
      name: 'المواقع |||| الموقع',
      showtabs: {
        show: 'التفاصيل',
        edit: 'تعديل',
      },
      fields: {
        id: 'معرف',
        published: 'النشر',
        createdAt: 'تاريخ الإنشاء',
        updatedAt: 'تاريخ التحديث',
        title: 'العنوان',
        title_en: 'العنوان (إنجليزي)',
      },
      edittabs: {
        edit: 'تعديل',
      },
    },
    app_section: {
      name: 'آقسام التطبيق |||| قسم التطبيق',
      showtabs: {
        show: 'التفاصيل',
        edit: 'تعديل',
      },
      fields: {
        id: 'معرف',
        published: 'النشر',
        createdAt: 'تاريخ الإنشاء',
        updatedAt: 'تاريخ التحديث',
        title: 'العنوان',
        title_en: 'العنوان (إنجليزي)',
      },
      edittabs: {
        edit: 'تعديل',
      },
    },
    eventjob: {
      name: 'وظائف الفعاليات |||| وظيفة',
      showtabs: {
        show: 'التفاصيل',
        edit: 'تعديل',
      },
      fields: {
        id: 'معرف',
        createdAt: 'تاريخ الإنشاء',
        updatedAt: 'تاريخ التحديث',
        title: 'الإسم',
        title_en: 'الإسم (إنجليزي)',
        rate: 'الراتب/ريال سعودي',
        rate_type: 'نوع الراتب',
        status: 'الحالة',
        eventId: 'الفعالية',
        companyId: 'الشركة',
        Event: {
          title: 'الفعالية',
          title_en: 'الفعالية',
        },
        company: {
          name: 'الشركة',
        },
      },
      edittabs: {
        edit: 'تعديل',
      },
      status: {
        OPEN: 'مفتوح',
        CLOSED: 'مغلق',
      },
      rate_type: {
        MONTHLY: 'شهري',
        DAY: 'يومي',
      },
    },
    eventshift: {
      name: 'ورديات الفعاليات |||| وردية',
      showtabs: {
        show: 'التفاصيل',
        edit: 'تعديل',
      },
      fields: {
        id: 'معرف',
        createdAt: 'تاريخ الإنشاء',
        updatedAt: 'تاريخ التحديث',
        start_time: 'بدء العمل',
        end_time: 'إنتهاء العمل',
        status: 'الحالة',
        eventId: 'الفعالية',
        companyId: 'الشركة',
        Event: {
          title: 'الفعالية',
          title_en: 'الفعالية',
        },
        company: {
          name: 'الشركة',
        },
      },
      edittabs: {
        edit: 'تعديل',
      },
      status: {
        OPEN: 'مفتوح',
        CLOSED: 'مغلق',
      },
      rate_type: {
        MONTHLY: 'شهري',
        DAY: 'يومي',
      },
    },
    applicants: {
      name: 'طلبات العمل |||| تفاصيل الطلب',
      showtabs: {
        show: 'التفاصيل',
        edit: 'تعديل',
      },
      fields: {
        id: 'معرف',
        createdAt: 'تاريخ الإنشاء',
        updatedAt: 'تاريخ التحديث',
        //
        name: 'الإسم',
        nationality: 'الجنسية',
        nationalID: 'رقم الهوية',
        dateOfBirth: 'تاريخ الميلاد',
        age: 'العمر',
        gender: 'الجنس',
        whatsapp: 'واتس اب',
        phone: 'رقم التواصل',
        //
        shift: 'الوردية',
        job: 'الوظيفة',
        //
        status: 'الحالة',
        eventId: 'الفعالية',
        companyId: 'الشركة',
        start_date: 'تاريخ بدء العمل',
        event: {
          title: 'الفعالية',
          title_en: 'الفعالية',
        },
        company: {
          name: 'الشركة',
        },
        contact: {
          phone: 'رقم الجوال',
          whatsapp: 'واتساب',
        },
      },
      edittabs: {
        edit: 'تعديل',
      },
    },
  },
}

export default customArabicMessages
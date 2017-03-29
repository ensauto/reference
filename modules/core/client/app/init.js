(function (app) {
  'use strict';

  // Start by defining the main module and adding the module dependencies
  angular
    .module(app.applicationModuleName, app.applicationModuleVendorDependencies);

  // Setting HTML5 Location Mode
  angular
    .module(app.applicationModuleName)
    .config(bootstrapConfig);

  function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  function bootstrapConfig($locationProvider, $httpProvider, $translateProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $httpProvider.interceptors.push('authInterceptor');
    
    var lang = getParameterByName('lang');
    if(!lang){
      lang = 'en';
    }
    var allLang = ['en', 'cn'];
    if (allLang.indexOf(lang)==-1){
      lang = 'en';
    }
    
    $translateProvider.translations('cn', {
      'TITLE': 'Hello',
      'FOO': 'This is a paragraph',
      'System': '系统',
      'Admin': '管理',
      'Tasks': '任务',
      'Workflows': '工作流',
      'EditProfile': '修改帐户',
      'EditProfilePicture': '更新帐户图片',
      'EditPassword': '修改密码',
      'Signin': '登录',
      'Register': '注册',
      'Signout': '退出',
      'WorkflowDiagram': '工作流图',
      'WorkflowAdmin': '工作流管理',
      'MyTasks': '我的任务',
      'UserAdmin': '用户管理',
      'DocumentType': '文档类型',
      'Station': '环节',
      'LastExecutedBy': '最后处理人',
      'AssignedTo': '环节处理人',
      'PublishedDate': '发起日期',
      'PublishedBy': '发起人',
      'RunningStatus': '运行状态',
      'Open': '打开',
      'DeletedUser': '删除用户',
      'Name': '名字',
      'Firstname': '名字',
      'Lastname': '姓',
      'EmployeeID': '工号',
      'Roles': '角色',
      'Email': '电子邮件',
      'Created': '创建',
      'Required': '必填',
      'Username': '用户名',
      'Password': '密码',
      'ForgotPassword': '忘记密码',
      'PasswordRequirements': '密码要求',
      'Submit': '提交',
      'Emailaddressisinvalid': '电子邮件有误',
      'Orsignupusingyouremail': '或用电邮注册',
      'User': '用户',
      'Update': '修改',
      'Search': '搜索',
      'Create': '创建',
      'Title': '题目',
      'Content': '内容',
      'CreatedBy': '创建人',
      'DeletedUser': '已删除用户',
      'SubmitType': '提交类型',
      'Save': '暂存',
      'Execute': '执行',
      'InitiatedDate': '发起日期',
      'InitiatedBy': '发起人',
      'DocumentStatus': '文档状态',
      'awaiting_approval': '待批',
      'draft': '草稿',
      'not_submitted': '未提交',
      'approval_performed': '已批',
      'RestoreYourPassword': '还原你的密码',
      'EnterYourUsername': '输入帐号用户名',
      'PasswordResetIsInvalid': '密码重置有误',
      'AskForANewPasswordReset': '要求密码重置',
      'PasswordSuccessfullyReset': '密码重置成功',
      'ContinueToHomePage': '继续首页',
      'ResetYourPassword': '重置密码',
      'NewPassword': '新密码',
      'EnterANewPassword': '输入新密码',
      'VerifyPassword': '确认密码',
      'EnterThePasswordAgainToVerify': '重新输入密码以确认',
      'PasswordsDoNotMatch': '密码不相符',
      'WorkflowModels': '流程建模',
      'WorkflowModule': '流程单元',
      'draft': '草稿',
      'TranslationOrder': '翻译订单',
      'TranslateOrder': '翻译订单',
      'ContactPerson': '联系人',
      'CompanyName': '公司名称',
      'ContactNumber': '联系电话',
      'Mobile': '手机号码',
      'Fax': '传真',
      'Email': '电子邮件',
      'Address': '地址',
      'Postcode': '邮政编号',
      'TranslateFrom': '需将文件由',
      'TranslateTo': '译成',
      'PageSize': '全部稿件共计',
      'RequiredFinishedIn': '全部稿件要求完成天数',
      'Delete': '删除',
      'Download': '下载',
      'SelectFiles': '打开文件',
      'BaseDropZone': '文件掉落区',
      'UploadQueue': '上载队列',
      'QueueLength': '队列长度',
      'Filename': '文件名',
      'Size': '大小',
      'Progress': '进度',
      'Status': '状态',
      'Action': '动作',
      'QueueProgress': '队列进度',
      'UploadAll': '上载所有',
      'CancelAll': '取消所有',
      'RemoveAll': '删除所有',
      'Upload': '上载',
      'Cancel': '取消',
      'Remove': '删除',
      'Quotation': '报价',
      'QuotationDetails': '报价细节',
      'SubmitOrder': '提交订单',
      'CreateOrderAndStartUpload': '创建订单，开始上载文件',
      'QuotationCompleted': '报价完成',
      'TranslationStart': '翻译开始',
      'TranslationExamination': '翻译审核',
      'TranslationCompleted' : '翻译完成',
      'BounceBack': '审核撤回',
      'quotation': '报价中',
      'translation_examination': '翻译审核中',
      'translation_completed': '翻译完成',
      'Chinese': '中语',
      'English': '英语',
      'Malay': '马来语',
      'French': '法语',
      'German': '德语',
      'Japanese': '日语',
      'MoreInformation_fy': '翻译资料描述其他特殊要求',
      'OrderSubmitted': '订单提交',
      'QuotationCompleted': '报价完成',
      'TranslationCompleted': '翻译完成',
      'TranslationStarts': '翻译开始',
      'TranslationSentForExamination': '翻译审核',
      'TranslationBounceback': '翻译撤回',
      'TranslationNotes': '翻译员记录',
      'ExaminerNotes': '翻译审核记录',
      'client': '客户',
      'org.sales.quotation': '报价组',
      'org.translation': '翻译组',
      'org.translation.examiner': '翻译审核组',
      'translation': '翻译',
      'DocumentIsAt': '文件在',
      'station': '环节',
      'translation_start': '翻译开始',
      'TranslatedFile': '翻译文件',
      'TranslationFile': '翻译原件',
      'Note': '笔记',
      'Actions': '动作',
      'wf_translation_order': '翻译订单',

      // module scope translation
      'Module A': 'A单元',
      // workflow scope translation
      'wf_innovation_idea': '创新点子',
      'InnovationIdea': '创新点子',
      'Idea': '点子',
      'Category': '类别',
      'Management': '行政',
      'Technical': '技术',
      'Approval': '审核',
      'Score': '评分',
      'Review': '评语',
      'PrizeMoney': '奖金',

      'SerialNo': '编号',
      'InstrumentName': '器具名称',
      'InternalSerialNo': '内部编号',



      // workflow scope translation
      'wf_abnormal_incident': '异常事件',
      'abnormal_incident_team': '异常事件组',
      'AbnormalIncident': '异常事件',
      'team_followup': '组跟进',
      'finished': '完成',
      'ActionTaken': '采取行动',
      'ManufactureDepartment': '制造部',
      'AbnormalIncidentDescription': '异常事件描述', 
      'org.manufacture.incidentInvestigator': '制造部检验人员',

      'Instruments': '器具总账',
      'Instrument': '器具',
      'InstrumentType': '器具类别',
      'working_tool': '工作计量器具',
      'standard_tool': '标准计量器具',
      'working_equipment': '工作计量装置',
      'standard_equipment': '标准工作',
      'WorkingTool': '工作计量器具',
      'StandardTool': '标准计量器具',
      'WorkingEquipment': '工作计量装置',
      'StandardEquipment': '标准计量装置',
      'ManagementStatus': '管理状态',
      'to_be_received': '等待领取',
      'checkup_completed_fail': '检验失败',
      'checkup_completed_pass': '检验合格',
      'to_be_checkup': '等待检验',
      'to_be_sent': '等待送检',
      'sealed': '封存',
      'in_use': '在用',
      'stock': '库存',
      'lost': '丢失',
      'write_off': '报废',
      'controlled_use': '限用',
      'Inspection_Type': '检定类型',
      'Inspection': '检定中',
      'fixed_asset': '固定资产',
      'depreciable_asset': '低值易耗',
      'internal_inspection': '内检',
      'external_inspection': '外检',
      'self_inspection': '自检',
      'Specification': '规格',
      'Model': '模型',
      'Measured_Range': '测量范围',
      'Precision': '准确度',
      'Uncertainty': '不确定度',
      'Maximum_Allowed_Error': '最大允许误差',
      'Management_Status': '管理状态',
      'ABC': 'ABC',
      'Enforced_Inspection': '强检',
      'Measurement_Type': '测量类别',
      'Manufacturer': '制造商',
      'Manufactured_Serial_Number': '制造编号',
      'Manufactured_Date': '出厂日期',
      'Purchased_Date': '购入日期',
      'Asset_Type': '资产类别',
      'Inspection_Results': '检定结果',
      'pass': '合格',
      'fail': '失败',
      'Instrument_Quality_Control': '计量检定部',
      'Inspection_Record': '检定记录',
      'Instrument_Inspection_Workflow': '计量检定流程',
      'internal_inspection': '内检',
      'external_inspection': '外检',
      'self_inspection': '自检',
      'Instrument_Inspection': '计量检定'


    });
 
    $translateProvider.translations('en', {
      'TITLE': 'Hello',
      'FOO': 'This is a paragraph',
      'System': 'System',
      'Admin': 'Admin',
      'Tasks': 'Tasks',
      'Workflows': 'Workflows',
      'EditProfile': 'Edit Profile',
      'EditProfilePicture': 'Edit Profile Picture',
      'EditPassword': 'Edit Password',
      'Signin': 'Sign In',
      'Register': 'Register',
      'Signout': 'Sign Out',
      'WorkflowDiagram': 'Workflow Diagram',
      'WorkflowAdmin': 'Workflow Admin',
      'MyTasks': 'My Tasks',
      'UserAdmin': 'User Admin',
      'DocumentType': 'Document Type',
      'Station': 'Station',
      'LastExecutedBy': 'Last Executed By',
      'AssignedTo': 'Assigned To',
      'PublishedDate': 'Published Date',
      'PublishedBy': 'Published By',
      'RunningStatus': 'Running Status',
      'Open': 'Open',
      'DeletedUser': 'Deleted User',
      'Name': 'Name',
      'Firstname': 'Firstname',
      'Lastname': 'Lastname',
      'EmployeeID': 'Employee ID',
      'Roles': 'Roles',
      'Email': 'Email',
      'Created': 'Created',
      'Required': 'Required',
      'Username': 'Username',
      'Password': 'Password',
      'ForgotPassword': 'Forgot Password',
      'PasswordRequirements': 'Password Requirements',
      'Submit': 'Submit',
      'Emailaddressisinvalid': 'Email address is invalid',
      'Orsignupusingyouremail': 'Or Sign Up using your email',
      'Update': 'Update',
      'Search': 'Search',
      'Create': 'Create',
      'Title': 'Title',
      'Content': 'Content',
      'CreatedBy': 'Created By',
      'DeletedUser': 'Deleted User',
      'SubmitType': 'Submit Type',
      'Save': 'Save',
      'Execute': 'Execute',
      'InitiatedDate': 'Initiated Date',
      'InitiatedBy': 'Initiated By',
      'DocumentStatus': 'Document Status',
      'awaiting_approval': 'Awaiting Approval',
      'draft': 'Draft',
      'not_submitted': 'Not Submitted',
      'approval_performed': 'Approval Performed',
      'RestoreYourPassword': 'Restore your password',
      'EnterYourUsername': 'Enter your username',
      'PasswordResetIsInvalid': 'Password reset is invalid',
      'AskForANewPasswordReset': 'Ask for a new password reset',
      'PasswordSuccessfullyReset': 'Password successfully reset',
      'ContinueToHomePage': 'Continue to home page',
      'ResetYourPassword': 'Reset your password',
      'NewPassword': 'New password',
      'EnterANewPassword': 'Enter a new password',
      'VerifyPassword': 'Verify password',
      'EnterThePasswordAgainToVerify': 'Enter the password again to verify',
      'PasswordsDoNotMatch': 'Passwords do not match',
      'WorkflowModels': 'Workflow Models',
      'WorkflowModule': 'Workflow Module',
      'draft': 'Draft',
      'TranslationOrder': 'Translate Order',
      'TranslateOrder': 'Translate Order',
      'ContactPerson': 'Contact Person',
      'CompanyName': 'Company Name',
      'ContactNumber': 'Contact Number',
      'Mobile': 'Mobile',
      'Fax': 'Fax',
      'Email': 'Email',
      'Address': 'Address',
      'Postcode': 'Postcode',
      'TranslateFrom': 'Translate From',
      'TranslateTo': 'Translate To',
      'PageSize': 'Page Size',
      'RequiredFinishedIn': 'Required Finished In',
      'Delete': 'Delete',
      'Download': 'Download',

      
      // module scope translation
      'Module A': 'Module A',
      // workflow scope translation
      'wf_innovation_idea': 'Innovation Idea',
      'InnovationIdea': 'Innovation Idea',
      'Idea': 'Idea',
      'Category': 'Category',
      'Management': 'Management',
      'Technical': 'Technical',
      'Approval': 'Approval',
      'Score': 'Score',
      'Review': 'Review',
      'PrizeMoney': 'Prize Money',



      // workflow scope translation
      'wf_abnormal_incident': 'Abnormal Incident',
      'AbnormalIncident': 'Abnormal Incident',
      'abnormal_incident_team': 'Abnormal Incident Team',
      'AbnormalIncident': 'Abnormal Incident',
      'team_followup': 'Team Followup',
      'finished': 'Finished',
      'ActionTaken': 'Action Taken',
      'ManufactureDepartment': 'Manufacture Department',
      'AbnormalIncidentDescription': 'Incident Description',
      'SerialNo': 'Serial Number',
      'InstrumentName': 'Instrument Name',
      'InternalSerialNo': 'Internal Serial.No',
      'Instruments': 'Instruments',



    });
 
    $translateProvider.preferredLanguage('cn');

    }

  bootstrapConfig.$inject = ['$locationProvider', '$httpProvider', '$translateProvider'];

  // Then define the init function for starting up the application
  angular.element(document).ready(init);

  function init() {
    // Fixing facebook bug with redirect
    if (window.location.hash && window.location.hash === '#_=_') {
      if (window.history && history.pushState) {
        window.history.pushState('', document.title, window.location.pathname);
      } else {
        // Prevent scrolling by storing the page's current scroll offset
        var scroll = {
          top: document.body.scrollTop,
          left: document.body.scrollLeft
        };
        window.location.hash = '';
        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scroll.top;
        document.body.scrollLeft = scroll.left;
      }
    }

    // Then init the app
    angular.bootstrap(document, [app.applicationModuleName]);
  }
}(ApplicationConfiguration));

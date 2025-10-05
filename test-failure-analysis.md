# Test Execution Failure Analysis

## Summary
- **Total Failed Tests**: 122
- **Browser**: Chrome
- **Execution Date**: Analysis performed

## Failed Tests by Category

| Category | Test File | Test Description | Failure Location |
|----------|-----------|------------------|------------------|
| **Admin Enrollments** | ADN_ENR010_Verify_that_a_Certification_already_marked_as_Completed_by_the_admin_does_not_revert_to_In_Progress_when_accessed_by_the_learner_cert.spec.ts | Verify certification completion status persistence | Line 50:9 |
| | ADN_ENR011a_Verify_Admin_Enrollment_Functionality_For_AICC_Content.spec.ts | Admin enrollment for AICC content | Line 48:9 |
| | ADN_ENR011b_Verify_Admin_Enrollment_Functionality_For_SCORM2004_Content.spec.ts | Admin enrollment for SCORM2004 content | Line 48:9 |
| | ADN_ENR011f_Verify_Admin_Enrollment_Functionality_For_Youtube_Content.spec.ts | Admin enrollment for YouTube content | Line 12:9 |
| **Completion Certificate** | CC001_Ensure_that_a_new_certificate_can_be_created_successfully_and_edited_afterward.spec.ts | Certificate creation and editing | Line 6:5 |
| **Course Management** | CRS001a_Confirm_that_YouTube_content_functions_correctly_and_as_expected.spec.ts | YouTube content functionality | Line 14:9 |
| | CRS001b_Confirm_that_AICC_content_functions_correctly_and_as_expected.spec.ts | AICC content functionality | Line 50:9 |
| | CRS001c_Confirm_that_Scorm2004_content_functions_correctly_and_as_expected.spec.ts | SCORM2004 content functionality | Line 48:9 |
| | CRS001d_Confirm_that_videomp4_content_functions_correctly_and_as_expected.spec.ts | Video MP4 content functionality | Line 50:9 |
| | CRS001f_Confirm_that_Tincan_content_functions_correctly_and_as_expected.spec.ts | Tincan content functionality | Line 12:9 |
| | CRS001g_Confirm_that_PDF_content_functions_correctly_and_as_expected.spec.ts | PDF content functionality | Line 12:9 |
| | CRS001h_Confirm_that_Vimeo_content_functions_correctly_and_as_expected.spec.ts | Vimeo content functionality | Line 13:9 |
| | CRS001i_Confirm_that_Mp3_content_functions_correctly_and_as_expected.spec.ts | MP3 content functionality | Line 13:9 |
| | CRS002_Verify_that_course_should_be_created_as_multiple_instance_when_ILT_or_VC_delivery_type_is_choosed.spec.ts | Multi-instance ILT/VC course creation | Line 20:9 |
| | CRS003_Verify_learning_admin_able_to_create_a_Single_instance_E-learning_course_with_Multiple_content_Survey_and_Assesment.spec.ts | Single instance with multiple content | Line 14:9 |
| | CRS009_Confirm_that_the_learner_can_cancel_their_eLearning_enrollment_from_the_Mylearning_page.spec.ts | Learner enrollment cancellation | Line 51:9 |
| | CRS011_Verify_the_change_class_functionality_E-learning_to_E-learning.spec.ts | Class change functionality | Line 21:9 |
| | CRS012_Verify_that_learner_able_to_enroll_in_a_course_after_completing_the_required_prerequisite_course.spec.ts | Single prerequisite course | Line 14:9 |
| | CRS013_Verify_that_learner_able_to_enroll_in_a_course_after_completing_all_the_required_prerequisite_courses.spec.ts | Multiple prerequisite courses | Line 15:9 |
| | CRS014_verify_that_equivalence_functionality_works_correctly_for_enrolled_course.spec.ts | Course equivalence functionality | Line 13:5 |
| | CRS015_verify_that_equivalence_functionality_works_correctly.spec.ts | General equivalence functionality | Line 38:5 |
| | CRS016_Verify_the_change_class_functionality_ILT_to_E-learning.spec.ts | ILT to E-learning change | Line 19:9 |
| | CRS017_Verify_that_prerequisite_fuctionality_before_attempting_main_course.spec.ts | Prerequisite validation | Line 14:9 |
| | CRS019_Confirm_that_thumbnail_correctly_uploaded_from_system_gallery_and_as_expected.spec.ts | System gallery thumbnail | Line 40:9 |
| | CRS020_Confirm_that_thumbnail_correctly_uploaded_from_custom_gallery_and_as_expected.spec.ts | Custom gallery thumbnail | Line 13:9 |
| | CRS021_Confirm_that_Multiple_Scorm1.2_content_functions_correctly_and_as_expected.spec.ts | Multiple SCORM 1.2 content | Line 38:9 |
| | CRS022a_Ensure_that_the_specific_email_entered_by_the_admin_is_displayed_in_the_course_details_page.spec.ts | Admin email display | Line 12:5 |
| | CRS022b_Ensure_that_the_admin_email_entered_by_the_admin_displayed_in_the_course_details_page.spec.ts | Customer admin email display | Line 13:5 |
| | CRS023a_Verify_that_content_validity_option_date_working_as_expected.spec.ts | Content validity - date option | Line 11:9 |
| | CRS023b_Verify_that_content_validity_option_daysFromEnrollment_working_as_expected.spec.ts | Content validity - days from enrollment | Line 11:9 |
| | CRS023c_Verify_that_content_validity_option_daysFromLauch_working_as_expected.spec.ts | Content validity - days from launch | Line 13:9 |
| | CRS024_Verifying_that_the_max_seat_override_functionality_is_working_as_expected_for_the_elearning_course.spec.ts | Max seat override - E-learning | Line 28:9 |
| | CRS025_Verifying_that_the_max_seat_override_functionality_is_working_as_expected_for_the_ILT_course.spec.ts | Max seat override - ILT | Line 32:9 |
| | CRS026_Verifying_that_the_max_seat_override_functionality_is_working_as_expected_for_the_VC_course.spec.ts | Max seat override - VC | Line 29:9 |
| | CRS027_Verifying_that_without_max_seat_override_functionality_is_working_as_expected_for_the_elearning_course.spec.ts | Without max seat override - E-learning | Line 28:9 |
| | CRS028_Verifying_that_without_max_seat_override_functionality_is_working_as_expected_for_the_ILT_course.spec.ts | Without max seat override - ILT | Line 32:9 |
| | CRS029_Verifying_that_without_max_seat_override_functionality_is_working_as_expected_for_the_VC_course.spec.ts | Without max seat override - VC | Line 29:9 |
| | CRS030_Verify_that_admin_able_to_increase_the_seats_for_E-learning_and_user_able_to_enroll_for_the_same_in_admin_and_learner_side.spec.ts | Seat increase functionality | Line 27:9 |
| | CRS031_Verify_that_courses_saved_as_Hidden_in_Catalog_are_not_visible_to_the_learner_in_the_catalog_section.spec.ts | Hidden course visibility | Line 37:9 |
| | CRS032_Verify_that_the_learner_can_successfully_enroll_in_a_course_from_the_Learn_within_30_mins_section_in_the_learner_catalog.spec.ts | Learn within 30 mins enrollment | Line 38:9 |
| | CRS033_Verify_instance_creation_when_converting_a_published_single-instance_e-learn_class_to_multi-instance.spec.ts | Single to multi-instance conversion | Line 45:9 |
| | CRS034_Verify_that_the_admin_can_cancel_an_ILT_class_with_active_enrollments.spec.ts | ILT class cancellation | Line 19:9 |
| | CRS035_Verify_that_the_admin_can_cancel_an_VC_class_with_active_enrollments.spec.ts | VC class cancellation | Line 16:9 |
| | CRS036_Verify_that_the_admin_can_cancel_an_ILT_class_with_no_enrollments.spec.ts | ILT class cancellation (no enrollments) | Line 19:9 |
| | CRS037_Verify_that_the_admin_can_mark_an_e-learn_course_as_complete_when_there_are_no_enrollments,_or_only_cancelled_or_completed_enrollments.spec.ts | E-learn course completion marking | Line 56:13 |
| | CRS039_Verify_Dedicate_to_tp_course_is_not_available_as_a_standalone_in_learner_catalog.spec.ts | Dedicated to TP course visibility | Line 39:9 |
| | CRS040_Verify_that_admin_able_to_create_recurring_ILT.spec.ts | Recurring ILT creation | Line 18:9 |
| | CRS041_Verify_that_admin_able_to_create_recurring_VC.spec.ts | Recurring VC creation | Line 63:13 |
| | CRS042_Verify_that_course_should_be_created_as_multiple_instance_when_ILT_or_VC_delivery_type_is_choosed.spec.ts | Bulk class creation | Line 20:9 |
| | CRS045_Verify_that_the_admin_cannot_delete_an_E-Learn_course_that_has_active_enrollments_and_is_marked_as_Show_in_Catalog.spec.ts | E-learn course deletion restriction | Line 48:9 |
| | CRS046_Verify_that_the_admin_can_delete_Multi-Instance_course_when_it_is_saved_as_Hidden_in_Catalog_or_Saved_as_Draft.spec.ts | Multi-instance course deletion | Line 18:9 |
| | CRS047_Verify_that_the_admin_cannot_delete_a_Multi-Instance_course_that_has_active_enrollments_and_is_marked_as_Show_in_Catalog.spec.ts | Multi-instance course deletion restriction | Line 18:9 |
| | CRS048_VC_session_details_even_when_there_are_active_enrollments_and_verify_the_alert_in_Learner's_INA_section.spec.ts | VC session details editing | Line 18:9 |
| | CRS049_Verify_past_ILT_Class_is_not_available_to_the_learner.spec.ts | Past ILT class availability | Line 20:9 |
| **Metadata Library** | ML001_Verify_metadataLibrary_Learning.spec.ts | Category creation in metadata library | Line 6:9 |
| | ML004_Verify_metadataLibrary_General.spec.ts | Language selection and equipment addition | Lines 4:5, 24:5 |
| **Organization** | ORG003_Verify_that_an_organization_can_be_successfully_created_with_a_parent_organization_assigned_and_the_count_of_organizations_under_the_parent_is_accurately_reflected.spec.ts | Organization creation with parent | Line 7:5 |
| **People Module/User** | USR014_peoplemodule.spec.ts | People module attributes, impersonation, user deletion | Lines 53:9, 119:9, 139:9 |
| **Quick Access** | QA001_Verify_able_to_add_modules_through_quick_access.spec.ts | Module addition through quick access | Line 40:5 |
| **Training Plan** | Data_TP.spec.ts | Certification with single instance behavior | Line 14:9 |
| | TP008_confirm_that_the_rollback_occurs_successfully_when_a_learner_completes_the_course_and_then_registers_for_the_certification.spec.ts | Rollback functionality | Line 51:9 |
| | TP009_Verify_that_a_course_enrolled_via_TP_is_not_available_as_a_standalone_in_the_course_catalog.spec.ts | TP course availability | Line 49:9 |
| | TP010_Confirm_whether_a_rollback_does_not_occur_when_a_learner_enrolls_in_an_already_completed_course_as_part_of_the_recertification_path.spec.ts | Recertification rollback | Line 80:9 |
| | TP011_Verify_rollback_does_not_occur_when_the_same_course_is_attached_in_both_Certification_and_Recertification_paths.spec.ts | Dual path rollback | Line 43:9 |
| | TP012_confirm_that_the_rollback_occurs_successfully_when_a_learner_completes_the_course_and_then_registers_for_the_lp.spec.ts | Learning path rollback | Line 15:9 |
| | TP013_Verify_that_learner_able_to_enroll_in_Learning_Path_after_completing_the_required_prerequisite_course.spec.ts | LP prerequisite enrollment | Line 57:9 |
| | TP014_Verify_that_learner_able_to_enroll_in_Learning_Path_after_completing_the_required_prerequisite_course.spec.ts | LP prerequisite enrollment (variant) | Line 73:5 |
| | TP015_Verify_that_certification_enrollment_and_completion_occurred_at_the_module_level.spec.ts | Module-level certification | Line 59:9 |
| | TP016_Confirm_that_a_learner_can_successfully_register_for_and_complete_a_certification_through_a_single-instance_course.spec.ts | Single-instance certification | Line 80:9 |
| | TP017_Confirm_that_a_learner_can_successfully_register_the_certification.spec.ts | Certification registration | Line 11:9 |
| | TP018_Verify_that_a_learner_can_successfully_enroll_in_a_certification_that_includes_a_multi-instance_course.spec.ts | Multi-instance certification | Line 14:9 |
| | TP023_Verify_the_Enforce_Sequence_flow_LP.spec.ts | Enforce sequence in LP | Line 101:9 |
| | TP024_Verify_the_Enforce_Sequence_flow_Cert.spec.ts | Enforce sequence in certification | Line 16:9 |
| | TP025_Ensure_that_a_Learning_Path_created_in_one_portal_is_not_displayed_or_accessible_in_any_other_portal.spec.ts | Cross-portal LP visibility | Line 16:9 |
| | TP026_Verify_Learning_Path_with_Pre_Post_Assessment_and_Survey.spec.ts | LP with assessments and surveys | Line 15:9 |
| | TP027_Learning_Path_reenroll_flow_.spec.ts | LP re-enrollment flow | Line 13:9 |
| | TP029_Verify_that_the_learner_is_able_to_launch_TP-level_pre-_and_post-video_type_assessment_questions.spec.ts | TP-level video assessments | Line 13:9 |
| **User Creation** | USR004_Verify_that_user_address_validation_from_signup_for_valid_address.spec.ts | Address validation - valid (signup) | Line 27:5 |
| | USR005_Verify_that_user_address_validation_from_signup_for_Invalid_address.spec.ts | Address validation - invalid (signup) | Line 27:5 |
| | USR006_Verify_that_user_address_validation_from_profile_page_for_valid_address.spec.ts | Address validation - valid (profile) | Line 54:5 |
| | USR007_Verify_that_user_address_validation_from_profile_for_Invalid_address.spec.ts | Address validation - invalid (profile) | Line 54:5 |
| | USR008_Verify_that_a_customer_admin_can_successfully_create_a_new_user_within_the_portal_1.spec.ts | User creation in portal 1 | Line 8:5 |
| | USR009_Verify_that_a_customer_admin_can_successfully_create_a_new_user_within_the_portal_2.spec.ts | User creation in portal 2 | Line 7:5 |
| | USR010_Verify_that_user_can_be_successfully_created_with_internal_and_external_org_types.spec.ts | Internal/external org types | Lines 12:9, 49:9 |
| | USR011_Verify_that_admin_able_to_create_and_set_direct_report_to_assigned_manager.spec.ts | Direct report assignment | Line 13:5 |
| | USR013_Verify_that_a_user_can_be_created_and_successfully_perform_CRUD_operations_specifically_Update_and_Delete.spec.ts | User CRUD operations | Line 10:9 |
| **Wallet Card** | WC001_Configure_the_request_walletcard_delivery_in_config_file.spec.ts | Wallet card configuration | Line 5:5 |
| | WC002_Verify_the_admin_checked_request_walletcard_delivery_in_learnerside.spec.ts | Wallet card delivery (admin check) | Line 10:5 |
| | WC003_Check_request_walletcard_delivery_in_learnerside_without_completing_single_course.spec.ts | Wallet card delivery (no completion) | Line 10:5 |
| | WC004_Check_request_walletcard_delivery_in_learnerside_by_completing_single_course_and_Verify_whether_the_request_walletcard_delivery_checked_or_not_in_the_user_creation_page_after_the_learner_checked_that.spec.ts | Wallet card delivery (with completion) | Line 13:5 |
| **Verify Groups** | VG001_Verify_Admin_and_Learner_Groups.spec.ts | Admin and learner group verification | Lines 92:9, 134:9, 187:5, 234:5, 291:5 |
| **Learner Profile** | PRF001_Verify_that_learner_able_to_view_completion_crertificate_in_One_Profile.spec.ts | Completion certificate in profile | Line 13:5 |
| | PRF002_Verify_that_User_Profile_QR_Code_works_correctly.spec.ts | User profile QR code | Line 17:7 |
| | PRF003_Add_Skills.spec.ts | Adding skills to profile | Line 5:5 |
| | PRF004_Add_Profile_Image.spec.ts | Profile image addition | Line 58:9 |
| | PRF005_One_profile.spec.ts | One profile functionality | Line 9:9 |
| | PRF006_Add_Preferernce.spec.ts | Adding preferences | Line 16:9 |
| | PRF007_Add_Education.spec.ts | Adding education | Line 3:5 |
| | PRF008_Add_Work_Experience.spec.ts | Adding work experience | Line 7:5 |
| | PRF009_Add_Awards.spec.ts | Adding awards | Line 8:5 |
| | PRF010_Add_Interests.spec.ts | Adding interests | Line 4:5 |
| | PRF011_Add_External_Training_Certificate_Manager.spec.ts | External training certificate | Line 4:5 |
| **Learner Side** | BOOK001_Verify_that_the_user_is_able_to_bookmark_the_course_complete_it_and_then_remove_the_bookmark.spec.ts | Course bookmarking | Line 14:9 |
| | BOOK002_Verify_that_the_user_is_able_to_bookmark_the_content_complete_it_and_then_remove_the_bookmark.spec.ts | Content bookmarking | Line 14:9 |
| | BOOK003_Verify_that_the_user_is_able_to_bookmark_the_Certification_complete_it_and_then_remove_the_bookmark.spec.ts | Certification bookmarking | Line 9:9 |
| | BOOK004_Verify_that_the_user_is_able_to_bookmark_the_LP_complete_it_and_then_remove_the_bookmark.spec.ts | Learning path bookmarking | Line 9:9 |
| | WL001_Verify_that_the_learner_is_able_to_add_an_eLearning_course_to_the_wishlist_and_remove_it.spec.ts | Wishlist functionality | Line 8:9 |
| **Re-Enrollment** | RE001_Verify_that_the_learner_is_able_to_re-enroll_after_completing_Instance_1_of_a_multi-instance_eLearning_course.spec.ts | Multi-instance re-enrollment | Line 14:9 |
| | RE002_Verify_that_when_the_business_rule_is_unchecked_a_completed_course_allows_the_user_to_request_the_class.spec.ts | Business rule re-enrollment | Line 58:9 |
| | RE003_Verify_that_the_learner_is_able_to_re-enroll_in_the_same_eLearning_course_when_the_course_is_created_as_a_Recurring_Registration_with_ILT_and_eLearning.spec.ts | Recurring registration (ILT + E-learning) | Line 20:7 |
| | RE004_Verify_that_the_learner_is_able_to_re-enroll_in_a_future_ILT_after_completing_the_eLearning_class_when_the_course_is_created_as_a_Recurring_Registration_with_both_Future_ILT_and_eLearning.spec.ts | Future ILT re-enrollment | Line 20:9 |
| | RE005_Verify_that_the_learner_is_able_to_re-enroll_in_a_Past_ILT_after_completing_the_eLearning_class_when_the_course_is_created_as_a_Recurring_Registration_with_both_Past_ILT_and_eLearning.spec.ts | Past ILT re-enrollment | Line 18:9 |
| | RE006_Verify_that_the_learner_is_able_to_re-enroll_in_a_Future_VC_after_completing_the_eLearning_class_when_the_course_is_created_as_a_Recurring_Registration_with_both_Future_VC_and_eLearning.spec.ts | Future VC re-enrollment | Line 15:9 |
| | RE007_Verify_that_the_learner_is_able_to_re-enroll_in_a_Past_VC_after_completing_the_eLearning_class_when_the_course_is_created_as_a_Recurring_Registration_with_both_Past_VC_and_eLearning.spec.ts | Past VC re-enrollment | Line 15:9 |

## Analysis and Recommendations

### Common Failure Patterns
1. **Content Type Issues**: Multiple failures related to AICC, SCORM, YouTube, Video, PDF, and other content types
2. **Element Locator Issues**: Many tests failing at specific line numbers suggest element selection problems
3. **Viewport/Browser Issues**: Given the previous headless browser sizing issues, these failures might be related
4. **Timing Issues**: Tests failing at various stages might indicate timeout or synchronization problems

### Immediate Actions Needed
1. **Verify Browser Configuration**: Ensure the viewport changes are working correctly
2. **Check Element Locators**: Many selectors may need updates due to UI changes
3. **Review Test Data**: Ensure test data files are valid and accessible
4. **Investigate Timing**: Add proper waits and synchronization

### Next Steps
1. Run a smaller subset of tests to verify the viewport fix
2. Focus on one category at a time (e.g., start with Course Management)
3. Check for any recent UI changes that might affect element selectors
4. Review test environment setup and data dependencies
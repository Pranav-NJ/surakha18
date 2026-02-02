"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationTracking = exports.voicePatterns = exports.insertFamilySettingsSchema = exports.insertParentNotificationSchema = exports.insertFamilyConnectionSchemaV2 = exports.familySettings = exports.parentNotifications = exports.insertIotEmergencyTriggerSchema = exports.insertStressAnalysisSchema = exports.insertHealthMetricSchema = exports.insertIotDeviceSchema = exports.insertOtpVerificationSchema = exports.insertHomeLocationSchema = exports.insertDestinationSchema = exports.insertLiveStreamSchema = exports.insertSafeZoneSchema = exports.insertCommunityAlertSchema = exports.insertEmergencyAlertSchema = exports.insertEmergencyContactSchema = exports.upsertUserSchema = exports.insertUserSchema = exports.alertHistory = exports.familyConnections = exports.iotEmergencyTriggers = exports.stressAnalysis = exports.healthMetrics = exports.iotDevices = exports.otpVerifications = exports.homeLocations = exports.destinations = exports.liveStreams = exports.safeZones = exports.communityAlerts = exports.emergencyAlerts = exports.emergencyContacts = exports.users = exports.sessions = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
// Session storage table for authentication
exports.sessions = (0, pg_core_1.pgTable)("sessions", {
    sid: (0, pg_core_1.varchar)("sid").primaryKey(),
    sess: (0, pg_core_1.jsonb)("sess").notNull(),
    expire: (0, pg_core_1.timestamp)("expire").notNull(),
}, (table) => ({
    IDX_session_expire: (0, pg_core_1.index)("IDX_session_expire").on(table.expire),
}));
// Enhanced user schema with authentication
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.varchar)("id").primaryKey().notNull(),
    email: (0, pg_core_1.varchar)("email").unique(),
    firstName: (0, pg_core_1.varchar)("first_name"),
    lastName: (0, pg_core_1.varchar)("last_name"),
    profileImageUrl: (0, pg_core_1.varchar)("profile_image_url"),
    phoneNumber: (0, pg_core_1.text)("phone_number"),
    whatsappNumber: (0, pg_core_1.text)("whatsapp_number"),
    password: (0, pg_core_1.varchar)("password"),
    isVerified: (0, pg_core_1.boolean)("is_verified").default(false),
    familyConnectionCode: (0, pg_core_1.varchar)("family_connection_code").unique(),
    emergencyMessage: (0, pg_core_1.text)("emergency_message").default("Emergency! I need help. This is an automated message from Sakhi Suraksha."),
    isLocationSharingActive: (0, pg_core_1.boolean)("is_location_sharing_active").default(false),
    theme: (0, pg_core_1.text)("theme").default("light"),
    voiceActivationEnabled: (0, pg_core_1.boolean)("voice_activation_enabled").default(true),
    shakeDetectionEnabled: (0, pg_core_1.boolean)("shake_detection_enabled").default(true),
    communityAlertsEnabled: (0, pg_core_1.boolean)("community_alerts_enabled").default(true),
    soundAlertsEnabled: (0, pg_core_1.boolean)("sound_alerts_enabled").default(true),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.emergencyContacts = (0, pg_core_1.pgTable)("emergency_contacts", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.varchar)("user_id").notNull().references(() => exports.users.id),
    name: (0, pg_core_1.text)("name").notNull(),
    phoneNumber: (0, pg_core_1.text)("phone_number").notNull(),
    email: (0, pg_core_1.text)("email"),
    relationship: (0, pg_core_1.text)("relationship"),
    priority: (0, pg_core_1.integer)("priority").default(0),
    isPrimary: (0, pg_core_1.boolean)("is_primary").default(false),
    isActive: (0, pg_core_1.boolean)("is_active").default(true),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow()
});
exports.emergencyAlerts = (0, pg_core_1.pgTable)("emergency_alerts", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.varchar)("user_id").notNull().references(() => exports.users.id),
    triggerType: (0, pg_core_1.text)("trigger_type").notNull(), // 'button', 'voice', 'shake', 'smartwatch'
    scenario: (0, pg_core_1.text)("scenario"),
    confidenceScore: (0, pg_core_1.real)("confidence_score"),
    transcription: (0, pg_core_1.text)("transcription"),
    audioAnalysis: (0, pg_core_1.jsonb)("audio_analysis"),
    latitude: (0, pg_core_1.real)("latitude"),
    longitude: (0, pg_core_1.real)("longitude"),
    address: (0, pg_core_1.text)("address"),
    audioRecordingUrl: (0, pg_core_1.text)("audio_recording_url"),
    videoRecordingUrl: (0, pg_core_1.text)("video_recording_url"),
    deviceInfo: (0, pg_core_1.text)("device_info"), // Smartwatch or device details
    status: (0, pg_core_1.text)("status").default("active"),
    isResolved: (0, pg_core_1.boolean)("is_resolved").default(false),
    notificationsSent: (0, pg_core_1.integer)("notifications_sent").default(0),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow()
});
exports.communityAlerts = (0, pg_core_1.pgTable)("community_alerts", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.varchar)("user_id").references(() => exports.users.id), // Optional for anonymous reports
    type: (0, pg_core_1.text)("type").notNull(), // 'safety_issue', 'harassment', 'poor_lighting', etc.
    description: (0, pg_core_1.text)("description").notNull(),
    latitude: (0, pg_core_1.real)("latitude").notNull(),
    longitude: (0, pg_core_1.real)("longitude").notNull(),
    severity: (0, pg_core_1.text)("severity").notNull().default("medium"), // 'low', 'medium', 'high'
    verified: (0, pg_core_1.boolean)("verified").default(false),
    reportedBy: (0, pg_core_1.text)("reported_by").default("anonymous"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow()
});
exports.safeZones = (0, pg_core_1.pgTable)("safe_zones", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.varchar)("user_id").references(() => exports.users.id),
    name: (0, pg_core_1.text)("name").notNull(),
    latitude: (0, pg_core_1.real)("latitude").notNull(),
    longitude: (0, pg_core_1.real)("longitude").notNull(),
    radius: (0, pg_core_1.real)("radius").notNull(), // in meters
    isActive: (0, pg_core_1.boolean)("is_active").default(true),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow()
});
// Live streaming sessions for emergency video sharing
exports.liveStreams = (0, pg_core_1.pgTable)("live_streams", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.varchar)("user_id").notNull().references(() => exports.users.id),
    emergencyAlertId: (0, pg_core_1.integer)("emergency_alert_id").references(() => exports.emergencyAlerts.id),
    streamUrl: (0, pg_core_1.text)("stream_url").notNull(),
    shareLink: (0, pg_core_1.text)("share_link").notNull(),
    isActive: (0, pg_core_1.boolean)("is_active").default(true),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    endedAt: (0, pg_core_1.timestamp)("ended_at")
});
// Routes and destinations for safe route planning
exports.destinations = (0, pg_core_1.pgTable)("destinations", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.varchar)("user_id").notNull().references(() => exports.users.id),
    name: (0, pg_core_1.text)("name").notNull(),
    address: (0, pg_core_1.text)("address").notNull(),
    latitude: (0, pg_core_1.real)("latitude").notNull(),
    longitude: (0, pg_core_1.real)("longitude").notNull(),
    isFavorite: (0, pg_core_1.boolean)("is_favorite").default(false),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow()
});
// Home locations table
exports.homeLocations = (0, pg_core_1.pgTable)("home_locations", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.varchar)("user_id").notNull().unique().references(() => exports.users.id),
    latitude: (0, pg_core_1.real)("latitude").notNull(),
    longitude: (0, pg_core_1.real)("longitude").notNull(),
    address: (0, pg_core_1.text)("address"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
// OTP verification table
exports.otpVerifications = (0, pg_core_1.pgTable)("otp_verifications", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    identifier: (0, pg_core_1.varchar)("identifier").notNull(), // phone number or email
    type: (0, pg_core_1.varchar)("type").notNull(), // 'phone' or 'email'
    otp: (0, pg_core_1.varchar)("otp").notNull(),
    isVerified: (0, pg_core_1.boolean)("is_verified").default(false),
    expiresAt: (0, pg_core_1.timestamp)("expires_at").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
// IoT Device Management
exports.iotDevices = (0, pg_core_1.pgTable)("iot_devices", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.varchar)("user_id").notNull().references(() => exports.users.id),
    deviceName: (0, pg_core_1.text)("device_name").notNull(),
    deviceType: (0, pg_core_1.text)("device_type").notNull(), // 'smartwatch', 'fitness_tracker', 'health_monitor'
    macAddress: (0, pg_core_1.text)("mac_address").unique(),
    bluetoothId: (0, pg_core_1.text)("bluetooth_id"),
    isConnected: (0, pg_core_1.boolean)("is_connected").default(false),
    batteryLevel: (0, pg_core_1.integer)("battery_level"),
    firmwareVersion: (0, pg_core_1.text)("firmware_version"),
    lastConnected: (0, pg_core_1.timestamp)("last_connected"),
    connectionStatus: (0, pg_core_1.text)("connection_status").default("disconnected"), // 'connected', 'disconnected', 'pairing'
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow()
});
// Health Monitoring Data
exports.healthMetrics = (0, pg_core_1.pgTable)("health_metrics", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.varchar)("user_id").notNull().references(() => exports.users.id),
    deviceId: (0, pg_core_1.integer)("device_id").references(() => exports.iotDevices.id),
    heartRate: (0, pg_core_1.integer)("heart_rate"), // BPM
    bloodPressureSystolic: (0, pg_core_1.integer)("blood_pressure_systolic"),
    bloodPressureDiastolic: (0, pg_core_1.integer)("blood_pressure_diastolic"),
    oxygenSaturation: (0, pg_core_1.real)("oxygen_saturation"), // SpO2 percentage
    skinTemperature: (0, pg_core_1.real)("skin_temperature"), // Celsius
    stressLevel: (0, pg_core_1.real)("stress_level"), // 0-100 scale
    stepCount: (0, pg_core_1.integer)("step_count"),
    caloriesBurned: (0, pg_core_1.real)("calories_burned"),
    sleepQuality: (0, pg_core_1.real)("sleep_quality"), // 0-100 scale
    activityLevel: (0, pg_core_1.text)("activity_level"), // 'sedentary', 'light', 'moderate', 'vigorous'
    timestamp: (0, pg_core_1.timestamp)("timestamp").defaultNow(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow()
});
// Stress Analysis and AI Predictions
exports.stressAnalysis = (0, pg_core_1.pgTable)("stress_analysis", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.varchar)("user_id").notNull().references(() => exports.users.id),
    overallStressScore: (0, pg_core_1.real)("overall_stress_score").notNull(), // 0-100 scale
    heartRateVariability: (0, pg_core_1.real)("heart_rate_variability"),
    skinConductance: (0, pg_core_1.real)("skin_conductance"),
    movementPattern: (0, pg_core_1.text)("movement_pattern"), // 'restless', 'normal', 'lethargic'
    voiceStressIndicators: (0, pg_core_1.jsonb)("voice_stress_indicators"), // AI analysis results
    behaviorPattern: (0, pg_core_1.text)("behavior_pattern"), // 'agitated', 'calm', 'anxious'
    riskLevel: (0, pg_core_1.text)("risk_level").notNull(), // 'low', 'medium', 'high', 'critical'
    recommendedActions: (0, pg_core_1.text)("recommended_actions").array(),
    triggerFactors: (0, pg_core_1.text)("trigger_factors").array(),
    analysisTimestamp: (0, pg_core_1.timestamp)("analysis_timestamp").defaultNow(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow()
});
// Emergency Triggers from IoT Devices
exports.iotEmergencyTriggers = (0, pg_core_1.pgTable)("iot_emergency_triggers", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.varchar)("user_id").notNull().references(() => exports.users.id),
    deviceId: (0, pg_core_1.integer)("device_id").references(() => exports.iotDevices.id),
    triggerType: (0, pg_core_1.text)("trigger_type").notNull(), // 'heart_rate_anomaly', 'fall_detection', 'panic_button', 'stress_threshold'
    severity: (0, pg_core_1.text)("severity").notNull(), // 'low', 'medium', 'high', 'critical'
    sensorData: (0, pg_core_1.jsonb)("sensor_data"), // Raw sensor readings
    location: (0, pg_core_1.jsonb)("location"), // GPS coordinates
    isResolved: (0, pg_core_1.boolean)("is_resolved").default(false),
    responseTime: (0, pg_core_1.integer)("response_time"), // seconds
    emergencyAlertId: (0, pg_core_1.integer)("emergency_alert_id").references(() => exports.emergencyAlerts.id),
    timestamp: (0, pg_core_1.timestamp)("timestamp").defaultNow(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow()
});
// Persistent parent-child connections
exports.familyConnections = (0, pg_core_1.pgTable)("family_connections", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    parentUserId: (0, pg_core_1.varchar)("parent_user_id").notNull().references(() => exports.users.id),
    childUserId: (0, pg_core_1.varchar)("child_user_id").notNull().references(() => exports.users.id),
    relationshipType: (0, pg_core_1.text)("relationship_type").notNull().default("parent-child"), // 'parent-child', 'guardian-ward', 'caregiver-patient'
    status: (0, pg_core_1.text)("status").notNull().default("active"), // 'active', 'pending', 'inactive', 'blocked'
    permissions: (0, pg_core_1.jsonb)("permissions").default('{"location": true, "emergency": true, "monitoring": true}'),
    inviteCode: (0, pg_core_1.varchar)("invite_code").unique(),
    inviteExpiry: (0, pg_core_1.timestamp)("invite_expiry"),
    acceptedAt: (0, pg_core_1.timestamp)("accepted_at"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow()
});
// Enhanced emergency alerts with permanent storage
exports.alertHistory = (0, pg_core_1.pgTable)("alert_history", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    originalAlertId: (0, pg_core_1.integer)("original_alert_id").references(() => exports.emergencyAlerts.id),
    userId: (0, pg_core_1.varchar)("user_id").notNull().references(() => exports.users.id),
    parentUserId: (0, pg_core_1.varchar)("parent_user_id").references(() => exports.users.id),
    triggerType: (0, pg_core_1.text)("trigger_type").notNull(),
    message: (0, pg_core_1.text)("message"),
    latitude: (0, pg_core_1.real)("latitude"),
    longitude: (0, pg_core_1.real)("longitude"),
    address: (0, pg_core_1.text)("address"),
    status: (0, pg_core_1.text)("status").notNull(), // 'active', 'resolved', 'responded'
    resolvedAt: (0, pg_core_1.timestamp)("resolved_at"),
    resolvedBy: (0, pg_core_1.varchar)("resolved_by").references(() => exports.users.id),
    responseTime: (0, pg_core_1.integer)("response_time"), // seconds from trigger to resolution
    audioRecordingUrl: (0, pg_core_1.text)("audio_recording_url"),
    videoRecordingUrl: (0, pg_core_1.text)("video_recording_url"),
    liveStreamUrl: (0, pg_core_1.text)("live_stream_url"),
    emergencyContactsNotified: (0, pg_core_1.jsonb)("emergency_contacts_notified"),
    isArchived: (0, pg_core_1.boolean)("is_archived").default(false),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    archivedAt: (0, pg_core_1.timestamp)("archived_at")
});
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users).omit({
    createdAt: true,
    updatedAt: true
});
exports.upsertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users).omit({
    createdAt: true,
    updatedAt: true
});
exports.insertEmergencyContactSchema = (0, drizzle_zod_1.createInsertSchema)(exports.emergencyContacts).omit({
    id: true,
    createdAt: true
});
exports.insertEmergencyAlertSchema = (0, drizzle_zod_1.createInsertSchema)(exports.emergencyAlerts).omit({
    id: true,
    createdAt: true
}).extend({
    latitude: zod_1.z.union([zod_1.z.number(), zod_1.z.string().transform(Number)]).optional(),
    longitude: zod_1.z.union([zod_1.z.number(), zod_1.z.string().transform(Number)]).optional(),
    triggerType: zod_1.z.string().optional().default('manual_button'),
    userId: zod_1.z.string().optional().default('demo-user')
});
exports.insertCommunityAlertSchema = (0, drizzle_zod_1.createInsertSchema)(exports.communityAlerts).omit({
    id: true,
    createdAt: true
});
exports.insertSafeZoneSchema = (0, drizzle_zod_1.createInsertSchema)(exports.safeZones).omit({
    id: true,
    createdAt: true
});
exports.insertLiveStreamSchema = (0, drizzle_zod_1.createInsertSchema)(exports.liveStreams).omit({
    id: true,
    createdAt: true
});
exports.insertDestinationSchema = (0, drizzle_zod_1.createInsertSchema)(exports.destinations).omit({
    id: true,
    createdAt: true
});
exports.insertHomeLocationSchema = (0, drizzle_zod_1.createInsertSchema)(exports.homeLocations).omit({
    id: true,
    createdAt: true,
    updatedAt: true
});
exports.insertOtpVerificationSchema = (0, drizzle_zod_1.createInsertSchema)(exports.otpVerifications).omit({
    id: true,
    createdAt: true
});
exports.insertIotDeviceSchema = (0, drizzle_zod_1.createInsertSchema)(exports.iotDevices).omit({
    id: true,
    createdAt: true,
    updatedAt: true
});
exports.insertHealthMetricSchema = (0, drizzle_zod_1.createInsertSchema)(exports.healthMetrics).omit({
    id: true,
    createdAt: true,
    timestamp: true
});
exports.insertStressAnalysisSchema = (0, drizzle_zod_1.createInsertSchema)(exports.stressAnalysis).omit({
    id: true,
    createdAt: true,
    analysisTimestamp: true
});
exports.insertIotEmergencyTriggerSchema = (0, drizzle_zod_1.createInsertSchema)(exports.iotEmergencyTriggers).omit({
    id: true,
    createdAt: true,
    timestamp: true
});
// Parent notifications for child activities
exports.parentNotifications = (0, pg_core_1.pgTable)("parent_notifications", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    parentUserId: (0, pg_core_1.varchar)("parent_user_id").notNull(),
    childUserId: (0, pg_core_1.varchar)("child_user_id").notNull(),
    type: (0, pg_core_1.varchar)("type").notNull(), // 'emergency', 'location_update', 'safe_arrival', 'app_usage'
    title: (0, pg_core_1.varchar)("title").notNull(),
    message: (0, pg_core_1.text)("message").notNull(),
    data: (0, pg_core_1.jsonb)("data"), // Additional structured data
    isRead: (0, pg_core_1.boolean)("is_read").default(false),
    priority: (0, pg_core_1.varchar)("priority").notNull().default("normal"), // 'low', 'normal', 'high', 'critical'
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    readAt: (0, pg_core_1.timestamp)("read_at"),
});
// Family safety settings
exports.familySettings = (0, pg_core_1.pgTable)("family_settings", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    familyId: (0, pg_core_1.varchar)("family_id").notNull(), // Shared family identifier
    parentUserId: (0, pg_core_1.varchar)("parent_user_id").notNull(),
    childUserId: (0, pg_core_1.varchar)("child_user_id").notNull(),
    autoLocationSharing: (0, pg_core_1.boolean)("auto_location_sharing").default(true),
    emergencyAutoNotify: (0, pg_core_1.boolean)("emergency_auto_notify").default(true),
    safeZoneNotifications: (0, pg_core_1.boolean)("safe_zone_notifications").default(true),
    allowLiveTracking: (0, pg_core_1.boolean)("allow_live_tracking").default(false),
    allowEmergencyOverride: (0, pg_core_1.boolean)("allow_emergency_override").default(true),
    quietHours: (0, pg_core_1.jsonb)("quiet_hours"), // { start: "22:00", end: "07:00" }
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
// Schema validations for family connections
exports.insertFamilyConnectionSchemaV2 = (0, drizzle_zod_1.createInsertSchema)(exports.familyConnections).omit({
    id: true,
    createdAt: true,
    acceptedAt: true,
});
exports.insertParentNotificationSchema = (0, drizzle_zod_1.createInsertSchema)(exports.parentNotifications).omit({
    id: true,
    createdAt: true,
    readAt: true,
});
exports.insertFamilySettingsSchema = (0, drizzle_zod_1.createInsertSchema)(exports.familySettings).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
// Adding missing exports for voicePatterns and locationTracking
exports.voicePatterns = (0, pg_core_1.pgTable)("voice_patterns", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    pattern: (0, pg_core_1.text)("pattern").notNull(),
    description: (0, pg_core_1.text)("description"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.locationTracking = (0, pg_core_1.pgTable)("location_tracking", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.varchar)("user_id").notNull(),
    latitude: (0, pg_core_1.real)("latitude").notNull(),
    longitude: (0, pg_core_1.real)("longitude").notNull(),
    accuracy: (0, pg_core_1.real)("accuracy"),
    altitude: (0, pg_core_1.real)("altitude"),
    heading: (0, pg_core_1.real)("heading"),
    speed: (0, pg_core_1.real)("speed"),
    address: (0, pg_core_1.text)("address"),
    isEmergency: (0, pg_core_1.boolean)("is_emergency").default(false),
    emergencyAlertId: (0, pg_core_1.integer)("emergency_alert_id").references(() => exports.emergencyAlerts.id),
    batteryLevel: (0, pg_core_1.integer)("battery_level"),
    timestamp: (0, pg_core_1.timestamp)("timestamp").defaultNow(),
});

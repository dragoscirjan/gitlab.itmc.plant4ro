-- MySQL dump 10.13  Distrib 5.5.47, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: donations
-- ------------------------------------------------------
-- Server version	5.5.47-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `diplomas`
--

DROP TABLE IF EXISTS `diplomas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diplomas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `diplomaType` int(11) NOT NULL,
  `sent` int(11) NOT NULL,
  `donationId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_EEED2AD51E057D48` (`donationId`),
  CONSTRAINT `FK_EEED2AD51E057D48` FOREIGN KEY (`donationId`) REFERENCES `donations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diplomas`
--

LOCK TABLES `diplomas` WRITE;
/*!40000 ALTER TABLE `diplomas` DISABLE KEYS */;
/*!40000 ALTER TABLE `diplomas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donations`
--

DROP TABLE IF EXISTS `donations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `donations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `donation` decimal(10,2) NOT NULL,
  `currency` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  `exchange` decimal(6,4) NOT NULL,
  `trees` int(11) NOT NULL,
  `uuid` varchar(48) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) NOT NULL,
  `hash` text COLLATE utf8_unicode_ci,
  `hash_method` varchar(8) COLLATE utf8_unicode_ci DEFAULT NULL,
  `donatorId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_CDE98962A56AD13F` (`donatorId`),
  CONSTRAINT `FK_CDE98962A56AD13F` FOREIGN KEY (`donatorId`) REFERENCES `donators` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donations`
--

LOCK TABLES `donations` WRITE;
/*!40000 ALTER TABLE `donations` DISABLE KEYS */;
INSERT INTO `donations` VALUES (1,4500.00,'RON',0.0000,900,'PPR61100359556f46885ea6554.19501402',512,'','',1),(2,300.00,'RON',0.0000,60,'PPR89164425556f4697188c510.15347533',512,'','',2),(3,0.00,'RON',0.0000,0,'PPR116149266256f97c0f2fe046.05302495',512,'','',3),(4,0.00,'RON',0.0000,0,'PPR61100359556f46885ea6554.19501403',512,'','',4),(5,11.17,'EUR',4.4738,10,'PPR198964746356fd8ae39ed547.51127518',512,'[{\"name\":\"Dragos Cirjan\",\"email\":\"dragos.cirjan@gmail.com\",\"company\":\"Ninth Street Pharmacy\",\"vat\":\"\",\"friends\":[],\"anonymous\":false,\"trees\":10,\"locationGps\":\"44.4333,26.1\",\"donation\":{\"method\":\"braintree\",\"exchange\":\"4.4738\",\"total\":50,\"totalEur\":11.17,\"braintree\":{\"nonce\":\"8940c55c-be5f-4d73-8f1d-94fe3c47b1db\",\"details\":{\"lastTwo\":\"11\",\"cardType\":\"Visa\"},\"type\":\"CreditCard\",\"token\":\"eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI4MDNkMzI1N2UyZDQ2OGY5ZWM5OTk4NWU4NTNkYWE2OGE4MjQ5YWM5ZDIzOTUxZmE2ZDlhMTE0MWMxYTdhYTM3fGNyZWF0ZWRfYXQ9MjAxNi0wMy0zMVQyMDozODo0Ny41MzcxMTg2OTErMDAwMFx1MDAyNm1lcmNoYW50X2lkPTg5cGN4NHNzM2t6OHg1cTdcdTAwMjZwdWJsaWNfa2V5PXR3cDc5cXkycGc3NTVuaHoiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvODlwY3g0c3Mza3o4eDVxNy9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzg5cGN4NHNzM2t6OHg1cTcvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzg5cGN4NHNzM2t6OHg1cTcifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6ZmFsc2UsInBheXBhbEVuYWJsZWQiOnRydWUsInBheXBhbCI6eyJkaXNwbGF5TmFtZSI6IklUIE1lZGlhIENvbm5lY3QiLCJjbGllbnRJZCI6bnVsbCwicHJpdmFjeVVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS9wcCIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vdG9zIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiYWxsb3dIdHRwIjp0cnVlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6dHJ1ZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJpdG1lZGlhY29ubmVjdCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJjb2luYmFzZUVuYWJsZWQiOmZhbHNlLCJtZXJjaGFudElkIjoiODlwY3g0c3Mza3o4eDVxNyIsInZlbm1vIjoib2ZmIn0=\"}},\"phone\":\"9547561827\",\"recaptcha\":\"03AHJ_VutjuIQIA0L24hskRkow8TAKL967HtY06Ojtzt1NTSFURGT_8hNU_LCtWLNhdB38kBw_XDBjtzM-KcsAgtkik5-QvwAtFJ6yVBczxRPcODyVQTuEfyrsbCMJYzV6xNlICbFad_MDnyP6to9qQr6nfFLmeEJKyPQhBMNr8-9335Aps_yuDXCq-TB5A-7XKC-yINy6ONt4qHrzwdVCy3wWpK7WZZXqiy9b91fKUheDkolSUgnuNAkl6ZU5W_IzYy_pg_coxe_4XrEZ466n0JUBt79PPcn-UYgbXALiyxQLHXlxf3o5x6PX_EOm17WfwJ-m1bGJWb8yxr3ZHs7CIAGSAR01TdlX3-p9v5b-x0W8EmXOCoN8-yFrop02f62xbx4Pakr3xx2mrfZr4jjE8mylnMG_XROo1w-MIN4scVfX9MSU4MuTGmiPK6C-MjV_irKdkNHx2T7D4fn_T5wNvm8MUXY1S5Yf5kGhZ2p_UooOet8mTnsWB5r-wWoPm6U9v616cBeOhqOd8QVtrzRRO2jeXqakxJT_2upM9r5fUv8P8jKGW_XNIEdNN8mSfrLGe6ICABHgxCn0bqF8yvl2iyF0FAIWDxnOphC3Gzij_W9rH5ju9xnkaZertgPNp_plphIxoJbD94cjNo5oEM7kOuiumcZ2JhXV9Gs6gAew60djsJLd-6rWC2FDDDmDARocdCVUx4QzYdPUOKUy6Fv3JRN6G20XYQKwAQcWBBYRLgVxdWNK9pp_M96qdzfhwTTAG1ciedF7nBkpjT9tdXvXDxMpyCLVYde4Orr1O1ACYvCiKgYMJPC6taDNa79ukwlj0Yb2SIyo71SNEeIqM8VRVxwNoqVGYeD9HUT5di7-yi4pEjN41ei_P_3uAbCiEm8lxP4F-nBQ0FKuWXaVfafruFBuqfzs4IFSgSA2vl5D1Ah4pKbx3W4Gusk\",\"location\":\"Bucuresti Romania\"},{\"id\":\"djn443\",\"type\":\"sale\",\"amount\":\"11.17\",\"status\":\"submitted_for_settlement\",\"createdAt\":1459456740,\"cardEnding\":\"1111\",\"orderId\":\"PPR198964746356fd8ae39ed547.51127518\"}]','',3),(6,11.19,'EUR',4.4658,10,'PPR117530446757055bc5b37c17.84201524',512,'[{\"name\":\"Dragos Cirjan\",\"email\":\"dragos.cirjan@gmail.com\",\"company\":\"Ninth Street Pharmacy\",\"vat\":\"\",\"friends\":[],\"anonymous\":false,\"trees\":10,\"locationGps\":\"44.4333,26.1\",\"donation\":{\"method\":\"braintree\",\"exchange\":\"4.4658\",\"total\":50,\"totalEur\":11.19,\"braintree\":{\"nonce\":\"55d14976-0458-4206-a50a-2c2cdd40d853\",\"details\":{\"lastTwo\":\"11\",\"cardType\":\"Visa\"},\"type\":\"CreditCard\",\"token\":\"eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI2MjYyMjQ5YWJkN2EzOTNmY2IwYzJmNzkxYjljZmU5MmJjNzdmZGZhZTQwNDg4OTZhMjk0NDJiZTFhYTdlNDE4fGNyZWF0ZWRfYXQ9MjAxNi0wNC0wNlQxODo1NTo0OS4wMDE2NTg2OTkrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTg5cGN4NHNzM2t6OHg1cTdcdTAwMjZwdWJsaWNfa2V5PXR3cDc5cXkycGc3NTVuaHoiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvODlwY3g0c3Mza3o4eDVxNy9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzg5cGN4NHNzM2t6OHg1cTcvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzg5cGN4NHNzM2t6OHg1cTcifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6ZmFsc2UsInBheXBhbEVuYWJsZWQiOnRydWUsInBheXBhbCI6eyJkaXNwbGF5TmFtZSI6IklUIE1lZGlhIENvbm5lY3QiLCJjbGllbnRJZCI6bnVsbCwicHJpdmFjeVVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS9wcCIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vdG9zIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiYWxsb3dIdHRwIjp0cnVlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6dHJ1ZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJpdG1lZGlhY29ubmVjdCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJjb2luYmFzZUVuYWJsZWQiOmZhbHNlLCJtZXJjaGFudElkIjoiODlwY3g0c3Mza3o4eDVxNyIsInZlbm1vIjoib2ZmIn0=\"}},\"phone\":\"9547561827\",\"recaptcha\":\"03AHJ_VuubSOlMxIhKYXnVxVu3-r7kAAYN8to1GnBuKlPVVAoqdtRWOoaNGKNV_NBHEyZKJKrM149Zx1M12skTXmiB-4o3wDelSncXuZaY1G5xLfRUlM2ktYInarHiFL3n4YfFm7tzRi_9QEdNOnYLAgV7n9zDgXIcpUEHRqTR6ML-vvb6OOPYZheoO7ojI-SsAJ3-udaws0F3zghKt3VX4Yw9xq6yNGi-LZyaLlcgElgl43qMOJNCLQ3hatyLcGcwl_A4ckx61QRjd2LVQ5AXkytFTQeifQaJnKGVsIcY9mbs8VO84HPwgcfveeqaOq4BgkKAKKH8hBLIBO1gYk3ebzW8qB4lux-AxJCWWTl2Bos-MjQbwgqQwsrdlSfNeDpJNAkD3i7qHhPN6fs6-agkeLl0LXFzh1hMKOPxEQ-oX2lPzQ5bDJ0DWE2V1p6Ys3_hbTFDhBxoploMWMQrwHS2r1yU0llxbBgdQ3YSy3UV-Bt9gMV1v_NHc4wvjP3FnJ7K6__CZXBJZ-2DhbTxYnh-Z1q8lgI9Wcf8yfTS6_o4Sa69A_9x_kC9c30JiaSfPh1r-8DnavL69dRyDG871CkwsRx5r5JdGB6nQvLEPkDu5XOjFgqRUl9NAprd2p0zAsKf94SFoPqgKVfRWbnkkkzQx0QJYyRVyfuz13tjM3gPCrEZqja6v8DqtgS18LJNE5545eA73o2RMPfrwyXwOOOY3sKMdSUwCg2bpZPbW7ZQQGxy6asyAJGwkoXMbgN2WQSTWif3j4jUhmZYpfEPGg057WoxummhIW4pl5wN13yfTlVKVo2ivxw34hW44vVPV45N_zC4xbg9NtelqqICm56_zD5OBsZTPAdU0IInNX50ppsvQNCvWlNFKvfvSsVJEpraTyfdX4mE5sgsD9uM3Jrzgx2NtbW_b1k4bCIo3SdY6yA11mXBNzEKqbY\",\"location\":\"Bucuresti Romania\"},{\"id\":\"8jkj6c\",\"type\":\"sale\",\"amount\":\"11.19\",\"status\":\"submitted_for_settlement\",\"createdAt\":1459968966,\"cardEnding\":\"1111\",\"orderId\":\"PPR117530446757055bc5b37c17.84201524\"}]','',3),(7,11.18,'EUR',4.4711,10,'PPR807430251570d49c08a5a46.56213351',512,'[{\"name\":\"Dragos Cirjan\",\"email\":\"dragos.cirjan@gmail.com\",\"company\":\"Ninth Street Pharmacy\",\"vat\":\"\",\"friends\":[],\"anonymous\":false,\"trees\":10,\"locationGps\":\"44.4333,26.1\",\"donation\":{\"method\":\"braintree\",\"exchange\":\"4.4711\",\"total\":50,\"totalEur\":11.18,\"braintree\":{\"nonce\":\"031512a0-3fe9-4206-873e-3c8c55259e24\",\"details\":{\"lastTwo\":\"11\",\"cardType\":\"Visa\"},\"type\":\"CreditCard\",\"token\":\"eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI5NzI4ODM4MDM1ZTA4NmM3NmRjYzU4ZjQ0NmJlNzI4NTNlODBkODc4NTdiOGRjODZiZDUzYmVjYTA5NDMzYjMyfGNyZWF0ZWRfYXQ9MjAxNi0wNC0xMlQxOToxNjoyOS4wMTc4NDI3NTMrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTg5cGN4NHNzM2t6OHg1cTdcdTAwMjZwdWJsaWNfa2V5PXR3cDc5cXkycGc3NTVuaHoiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvODlwY3g0c3Mza3o4eDVxNy9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzg5cGN4NHNzM2t6OHg1cTcvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzg5cGN4NHNzM2t6OHg1cTcifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6ZmFsc2UsInBheXBhbEVuYWJsZWQiOnRydWUsInBheXBhbCI6eyJkaXNwbGF5TmFtZSI6IklUIE1lZGlhIENvbm5lY3QiLCJjbGllbnRJZCI6bnVsbCwicHJpdmFjeVVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS9wcCIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vdG9zIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiYWxsb3dIdHRwIjp0cnVlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6dHJ1ZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJpdG1lZGlhY29ubmVjdCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJjb2luYmFzZUVuYWJsZWQiOmZhbHNlLCJtZXJjaGFudElkIjoiODlwY3g0c3Mza3o4eDVxNyIsInZlbm1vIjoib2ZmIn0=\"}},\"phone\":\"9547561827\",\"recaptcha\":\"03AHJ_VusxxadcvUfFLTwtg_RMVHebgxDOTq8jKkvsUBOoubsheF9OPNx8e7bKrNYVg9796ZBypPH3C78yhvHr_K0pTYUliGWyL3JIoF85OV6p00afIEyvpS-B5ehxqPrCpZQY3bL8cyhk7Sc-1N-Lk2huSLNweCPDwW0QNGdWndNgUXE_CxTYmjFEzR3aKSvKmS68kE3JD5Eh5EMxMwFxJI7_ckfWg_yEqBUss-b6yk5V_1CtRcSH4AP8d8wu7tjiUlBumOFPjmDKL8cGivWdaebifuH09y6-dVgy1QomuTCy38NfXzhFMBLCUca0OqGbFtlEmLa8uRUKl7t74uaXm9x_j3xVZb10qTaLwRDDcvr4py73kYLnO9isLcXBC2_9QRTmHQgIw7i8jcq0UMftWxItWpwSqf-twNFzrSiJzpnWDe4fAQD2gH5mbc0g1TJ1SeUHNoGExd__yItHx_dIBDD8OJby1NSBCVwnyA_ZUBZyjd_S-ConlNwBYWWBQgGbapt3rPVWwan2TvxY0t2-ehvx9TsCbrPEBT2-s7Cd9g4ES3Iun9e8bRgw0Fr5o-0Lx43CEoJF4A78tnNow_SjXhWMrEzuQoJs1bu-bikGsGlpUaW8gL6JzWVs1C1-L_Q6eqb-nz8kQs7DjKL5ZGLrNTWAZHQz29UafCawpZE-9vXBLgY59L-4JkJgFt_r28F1QbiGjL73SxnuF_r0WHynuaKVHVcdEAABkN2yYit-B8WLuFcyPGMD0LApFkBXlsxTiUogr6JlaTiNLzpdXfzk99DSLawbRVqXUjDWZIb9yUN7L4h_Ppgi6nSgLKJnfGKQvxbG29801ZHOiGK9x9PX-FnrmLoffmIPofF3q2hWgIGqoJs1_hdALH2_7SfC4w9t8tBJStjcSmslOwQsoERJJ4uJX9BXFaJai1VLLy2VP--9p3vtP988xM8\",\"location\":\"Bucuresti Romania\"},{\"id\":\"9sf46c\",\"type\":\"sale\",\"amount\":\"11.18\",\"status\":\"submitted_for_settlement\",\"createdAt\":1460488641,\"cardEnding\":\"1111\",\"orderId\":\"PPR807430251570d49c08a5a46.56213351\"}]','',3);
/*!40000 ALTER TABLE `donations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donators`
--

DROP TABLE IF EXISTS `donators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `donators` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `company` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `location` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `locationGps` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `companyVAT` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `url` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `logo` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donators`
--

LOCK TABLES `donators` WRITE;
/*!40000 ALTER TABLE `donators` DISABLE KEYS */;
INSERT INTO `donators` VALUES (1,'','comunicare.comerciala@ro.sabmiller.com','Ursus Breweries','+40213140420','Bucuresti, Romania',NULL,'RO199095','http://ursus-breweries.ro/','ursus-breweries.jpg'),(2,'Florin Nan','florin.nan@gmail.com','','+40755022608','Rasnov, Romania',NULL,NULL,NULL,NULL),(3,'Dragos Cirjan','dragos.cirjan@gmail.com','IT Media Connect','+40726355762','Bucuresti, Romania',NULL,NULL,'http://itmediaconnect.ro/','itmcd-logo-200x140.png'),(4,'','','Casa Contelui','','Rasnov, Romania',NULL,NULL,'http://casacontelui.ro/','casacontelui.png');
/*!40000 ALTER TABLE `donators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forestry_units`
--

DROP TABLE IF EXISTS `forestry_units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `forestry_units` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unit_name` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `trees` int(11) NOT NULL,
  `gps` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gpsDetails` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `county` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forestry_units`
--

LOCK TABLES `forestry_units` WRITE;
/*!40000 ALTER TABLE `forestry_units` DISABLE KEYS */;
INSERT INTO `forestry_units` VALUES (1,'RPLP Kronstadt RA',10000,'',NULL,'',''),(2,'RPLP Piatra Craiului RA',10000,'',NULL,'',''),(3,'OS CiucaÅŸ RA',5000,'',NULL,'',''),(4,'RPL OS RÃ¢ÅŸnov RA',10000,'',NULL,'',''),(5,'RPLP Stejarul RA',15000,'',NULL,'',''),(6,'OS PÄƒdurea BogÄƒÅ£ii RA',10000,'',NULL,'',''),(7,'RPL OS PÄƒdurile Åžincii RA',10000,'',NULL,'',''),(8,'OS PÄƒdurile FÄƒgÄƒraÅŸului RA',5000,'',NULL,'',''),(9,'RPLP SÄƒcele RA',3400,'45.9824000,24.9486139',NULL,'',''),(10,'OS Codrii CetÄƒÅ£ilor RA',8000,'',NULL,'',''),(11,'RPLP MÄƒieruÅŸ RA',6500,'',NULL,'',''),(12,'RPL Bucegi Piatra Craiului RA',5000,'',NULL,'',''),(13,'OS Padurile Fagarasului',3000,'45.8824000,24.8486139',NULL,'',''),(14,'OS Padurile Fagarasului',2000,'45.6439583,24.7964500',NULL,'',''),(15,'OS BuzÄƒul Ardelean RA',2500,'45.4938889,26.0213889',NULL,'',''),(16,'OS BuzÄƒul Ardelean RA',2800,'45.5130556,26.0436111',NULL,'',''),(17,'OS BuzÄƒul Ardelean RA',4700,'45.6630556,26.2027778',NULL,'','');
/*!40000 ALTER TABLE `forestry_units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mobilpay`
--

DROP TABLE IF EXISTS `mobilpay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mobilpay` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(48) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hash` mediumtext COLLATE utf8_unicode_ci,
  `hash_method` varchar(8) COLLATE utf8_unicode_ci DEFAULT NULL,
  `stamp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mobilpay`
--

LOCK TABLES `mobilpay` WRITE;
/*!40000 ALTER TABLE `mobilpay` DISABLE KEYS */;
/*!40000 ALTER TABLE `mobilpay` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-07-11 17:56:46

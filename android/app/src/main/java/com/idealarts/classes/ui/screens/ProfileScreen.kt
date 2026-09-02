package com.idealarts.classes.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ExitToApp
import androidx.compose.material.icons.filled.Help
import androidx.compose.material.icons.filled.Receipt
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.idealarts.classes.ui.theme.LiveRed
import com.idealarts.classes.ui.theme.Navy800
import com.idealarts.classes.ui.theme.Teal300
import com.idealarts.classes.ui.theme.Teal600

@Composable
fun ProfileScreen(
    modifier: Modifier = Modifier,
    onLogout: () -> Unit
) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Student Card
        Card(
            shape = RoundedCornerShape(18.dp),
            colors = CardDefaults.cardColors(containerColor = Navy800),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(18.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(54.dp)
                            .clip(CircleShape)
                            .background(Teal600),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("AS", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 18.sp)
                    }
                    Spacer(modifier = Modifier.width(14.dp))
                    Column {
                        Text("Aarav Sharma", color = Color.White, style = MaterialTheme.typography.titleLarge)
                        Text("Roll: IAC-2026-088", color = Color.White.copy(alpha = 0.7f), fontSize = 12.sp)
                        Text("Diploma in Fine Arts (Yr 1)", color = Teal300, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceAround
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text("94%", color = Teal300, fontWeight = FontWeight.Bold, fontSize = 16.sp)
                        Text("Attendance", color = Color.White.copy(alpha = 0.7f), fontSize = 10.sp)
                    }
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text("86 hrs", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 16.sp)
                        Text("Studio Time", color = Color.White.copy(alpha = 0.7f), fontSize = 10.sp)
                    }
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text("14/15", color = Color(0xFFFF6B4A), fontWeight = FontWeight.Bold, fontSize = 16.sp)
                        Text("Assignments", color = Color.White.copy(alpha = 0.7f), fontSize = 10.sp)
                    }
                }
            }
        }

        // Action Options
        Card(
            shape = RoundedCornerShape(14.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
        ) {
            Column {
                ListItem(
                    headlineContent = { Text("Tuition Fee Receipt 2026", fontSize = 13.sp, fontWeight = FontWeight.SemiBold) },
                    supportingContent = { Text("Verified Paid Invoice", fontSize = 11.sp) },
                    leadingContent = { Icon(Icons.Default.Receipt, contentDescription = null, tint = Teal600) }
                )
                Divider()
                ListItem(
                    headlineContent = { Text("Faculty Helpline & Support", fontSize = 13.sp, fontWeight = FontWeight.SemiBold) },
                    supportingContent = { Text("WhatsApp Faculty Desk", fontSize = 11.sp) },
                    leadingContent = { Icon(Icons.Default.Help, contentDescription = null, tint = Teal600) }
                )
                Divider()
                ListItem(
                    headlineContent = { Text("Logout", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = LiveRed) },
                    leadingContent = { Icon(Icons.Default.ExitToApp, contentDescription = null, tint = LiveRed) },
                    modifier = Modifier.clickable { onLogout() }
                )
            }
        }
    }
}

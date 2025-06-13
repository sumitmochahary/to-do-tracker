package com.project.task_service.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document
public class Task {

    @Id
    private String taskId;
    private String taskTitle;
    private String userId;
    private String taskDescription;
    private String taskCategory;
    private String taskStatus;
    private LocalDate taskDueDate;
    private LocalDate taskCreatedDate;
    private Media media;
    private boolean archived;

    public Task() {
    }

    public Task(String taskId, String taskTitle, String userId, String taskDescription, String taskCategory, String taskStatus, LocalDate taskDueDate, LocalDate taskCreatedDate, Media media, boolean archived) {
        this.taskId = taskId;
        this.taskTitle = taskTitle;
        this.userId = userId;
        this.taskDescription = taskDescription;
        this.taskCategory = taskCategory;
        this.taskStatus = taskStatus;
        this.taskDueDate = taskDueDate;
        this.taskCreatedDate = taskCreatedDate;
        this.media = media;
        this.archived = archived;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getTaskTitle() {
        return taskTitle;
    }

    public void setTaskTitle(String taskTitle) {
        this.taskTitle = taskTitle;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public String getTaskCategory() {
        return taskCategory;
    }

    public void setTaskCategory(String taskCategory) {
        this.taskCategory = taskCategory;
    }

    public String getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(String taskStatus) {
        this.taskStatus = taskStatus;
    }

    public LocalDate getTaskDueDate() {
        return taskDueDate;
    }

    public void setTaskDueDate(LocalDate taskDueDate) {
        this.taskDueDate = taskDueDate;
    }

    public LocalDate getTaskCreatedDate() {
        return taskCreatedDate;
    }

    public void setTaskCreatedDate(LocalDate taskCreatedDate) {
        this.taskCreatedDate = taskCreatedDate;
    }

    public Media getMedia() {
        return media;
    }

    public void setMedia(Media media) {
        this.media = media;
    }

    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }
}
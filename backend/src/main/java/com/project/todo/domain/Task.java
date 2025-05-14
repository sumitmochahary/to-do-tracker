package com.project.todo.domain;

import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.print.attribute.standard.Media;
import java.time.LocalDate;
@Document
public class Task {
    @Id
    private String taskTitle;
    private String userId;
    private String taskDescription;
    private String taskCategory;
    private String taskStatus;
    private LocalDate taskDueDate;
    private LocalDate taskCreatedDate;
    private Media media;

    public Task() {
    }

    public Task(String taskTitle, String userId, String taskDescription, String taskCategory, String taskStatus, LocalDate taskDueDate, LocalDate taskCreatedDate, Media media) {
        this.taskTitle = taskTitle;
        this.userId = userId;
        this.taskDescription = taskDescription;
        this.taskCategory = taskCategory;
        this.taskStatus = taskStatus;
        this.taskDueDate = taskDueDate;
        this.taskCreatedDate = taskCreatedDate;
        this.media = media;
    }

    public String getTaskId() {
        return taskTitle;
    }

    public void setTaskId(String taskTitle) {
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

    @Override
    public String toString() {
        return "Task{" +
                "taskTitle=" + taskTitle +
                ", userId='" + userId + '\'' +
                ", taskDescription='" + taskDescription + '\'' +
                ", taskCategory='" + taskCategory + '\'' +
                ", taskStatus='" + taskStatus + '\'' +
                ", taskDueDate=" + taskDueDate +
                ", taskCreatedDate=" + taskCreatedDate +
                ", media=" + media +
                '}';
    }
}
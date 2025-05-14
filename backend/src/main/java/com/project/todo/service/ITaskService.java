package com.project.todo.service;

import com.project.todo.domain.Task;
import com.project.todo.exception.TaskNotFoundException;

import java.time.LocalDate;
import java.util.List;

public interface ITaskService {
    Task saveTask(Task task);
    List<Task> fetchTask(Task task) throws TaskNotFoundException;
    List<Task> fetchByCategory(String tCategory);
    List<Task> fetchByStatus(String tStatus);
    List<Task> fetchByDueDate(LocalDate tDueDate);
}


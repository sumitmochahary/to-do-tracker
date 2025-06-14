package com.project.todo.service;

import com.project.todo.domain.Task;
import com.project.todo.exception.TaskNotFoundException;
import com.project.todo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskServiceImpl implements ITaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public List<Task> fetchTask(Task task) throws TaskNotFoundException {
        List<Task> tasks = taskRepository.findByUserId(task.getUserId());
        if (tasks.isEmpty()) throw new TaskNotFoundException("No tasks found");
        return tasks;
    }

    @Override
    public List<Task> fetchAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public List<Task> fetchByCategory(String tCategory) {
        return taskRepository.findByTaskCategory(tCategory);
    }

    @Override
    public List<Task> fetchByStatus(String tStatus) {
        return taskRepository.findByTaskStatus(tStatus);
    }

    @Override
    public List<Task> fetchByDueDate(LocalDate tDueDate) {
        return taskRepository.findByTaskDueDate(tDueDate);
    }

    @Override
    public Task updateTask(Task updatedTask) throws TaskNotFoundException {
        Task existingTask = taskRepository.findById(updatedTask.getTaskId())  // Changed from findByTaskId to findById
                .orElseThrow(() -> new TaskNotFoundException("Task not found for updating"));

        // Update task details and force status to 'In-Progress'
        existingTask.setTaskTitle(updatedTask.getTaskTitle());
        existingTask.setTaskDescription(updatedTask.getTaskDescription());
        existingTask.setTaskCategory(updatedTask.getTaskCategory());
        existingTask.setTaskDueDate(updatedTask.getTaskDueDate());
        existingTask.setMedia(updatedTask.getMedia());
        existingTask.setTaskStatus(updatedTask.getTaskStatus());
        existingTask.setArchived(updatedTask.isArchived());// Force status

        return taskRepository.save(existingTask);
    }

    @Override
    public List<Task> fetchArchivedTasks(String userId) {
        return taskRepository.findByUserIdAndArchived(userId, true);
    }

    @Override
    public List<Task> fetchTaskByUserId(String userId) {
        return taskRepository.findByUserId(userId);
    }

    @Override
    public void deleteTask(String taskId) throws TaskNotFoundException {
        Task task = taskRepository.findById(taskId)  // Changed from findByTaskId to findById
                .orElseThrow(() -> new TaskNotFoundException("Task not found"));
        taskRepository.delete(task);
    }

    @Override
    public Task getTaskById(String taskId) throws TaskNotFoundException {
        return taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with ID: " + taskId));
    }

    @Override
    public Task archiveTask(String taskId) throws TaskNotFoundException {  // Changed from int to String
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException("Task not found for archiving"));

        if (!"Completed".equalsIgnoreCase(task.getTaskStatus())) {
            throw new TaskNotFoundException("Only tasks with 'Completed' status can be archived.");
        }

        // Set status to 'Archived'
        task.setTaskStatus("Archived");
        task.setArchived(true);
        return taskRepository.save(task);
    }
}

